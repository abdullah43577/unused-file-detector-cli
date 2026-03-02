import { glob } from "glob";
import * as path from "path";
import * as fs from "fs";
import chalk from "chalk";
import ora from "ora";
import { Table } from "console-table-printer";
import { checkFileIsImportedHere } from "../helper.js";

export const detectUnusedModules = async function (directory: string) {
  try {
    console.log(chalk.bold.cyan("\n🔍 Unused Module Detector\n"));
    const packageJsonPath = path.join(directory, "package.json");
    // Step 1: Find all source files
    const findFilesSpinner = ora("Scanning project files...").start();
    const allFiles = await glob("./src/**/*.{ts,tsx,js,jsx}", {
      ignore: ["node_modules/**", "dist/**"],
    });
    findFilesSpinner.succeed(chalk.green(`Found ${allFiles.length} files to scan`));

    if (!fs.existsSync(packageJsonPath)) {
      console.log(chalk.bold.red(`\n❌ Error: No package.json found in the directory ${directory}\n`));
      return;
    }

    // Step 2: Read package.json and get dependencies
    const readPackageSpinner = ora("Reading package.json...").start();
    const packageJsonContent = await fs.promises.readFile(packageJsonPath, "utf-8");
    const packageJson = JSON.parse(packageJsonContent);
    const dependencies = Object.keys(packageJson.dependencies || {});
    const devDependencies = Object.keys(packageJson.devDependencies || {});
    const allModules = [...dependencies, ...devDependencies];
    readPackageSpinner.succeed(chalk.green(`Found ${allModules.length} modules to analyze`));

    // Step 3: Check for unused modules
    const unusedModules = [];
    const usedModules = [];

    console.log(chalk.bold.yellow(`\n📊 Analyzing module usage...\n`));

    const progressSpinner = ora({
      text: "Processing modules...",
      spinner: "dots",
    }).start();

    const start = performance.now();
    console.log(chalk.gray(`This may take a moment for larger projects...`));

    let processed = 0;

    for (const moduleName of allModules) {
      processed++;
      const percentage = Math.round((processed / allModules.length) * 100);
      progressSpinner.text = `Processing ${processed}/${allModules.length} (${percentage}%): ${chalk.gray(moduleName)}`;

      let isImportedAnywhere = false;

      for (const file of allFiles) {
        try {
          const content = await fs.promises.readFile(file, "utf-8");

          const isImported = checkFileIsImportedHere({
            content,
            filePath: moduleName,
          });

          if (isImported) {
            isImportedAnywhere = true;
            break; // No need to check remaining files
          }
        } catch (error) {
          // Handle file read errors gracefully
          continue;
        }
      }

      // Yield control to allow spinner animation
      await new Promise(resolve => setImmediate(resolve));

      if (isImportedAnywhere) {
        usedModules.push(moduleName);
      } else {
        unusedModules.push(moduleName);
      }
    }

    progressSpinner.succeed(chalk.green(`Analysis complete!`));
    const end = performance.now();
    const duration = ((end - start) / 1000).toFixed(2);
    console.log(chalk.gray(`⏱️  Time taken: ${duration} seconds\n`));

    // Step 4: Display results
    console.log(chalk.bold.cyan("\n📋 Results:\n"));

    if (unusedModules.length === 0) {
      console.log(chalk.green("✨ No unused modules found! Your dependencies are clean.\n"));
    } else {
      console.log(chalk.red(`⚠️  Found ${unusedModules.length} unused module(s):\n`));

      const table = new Table({
        columns: [
          { name: "index", alignment: "right", title: chalk.bold("#"), color: "gray" },
          { name: "moduleName", alignment: "left", title: chalk.bold("Module Name"), color: "yellow" },
          { name: "type", alignment: "center", title: chalk.bold("Dependency Type"), color: "magenta" },
        ],
      });

      unusedModules.forEach((moduleName, index) => {
        const dependencies = Object.keys(packageJson.dependencies || {});
        const isDependency = dependencies.includes(moduleName);
        const dependencyType = isDependency ? "dependency" : "devDependency";

        table.addRow({
          index: index + 1,
          moduleName: moduleName,
          type: dependencyType,
        });
      });

      table.printTable();
    }

    // Summary
    console.log(chalk.bold.cyan("\n📈 Summary:\n"));

    const summaryTable = new Table({
      columns: [
        { name: "metric", alignment: "left", color: "white" },
        { name: "value", alignment: "right" },
      ],
    });

    summaryTable.addRow({
      metric: "Total Modules",
      value: chalk.blue(allModules.length),
    });
    summaryTable.addRow({
      metric: "Dependencies",
      value: chalk.blue(dependencies.length),
    });
    summaryTable.addRow({
      metric: "Dev Dependencies",
      value: chalk.blue(devDependencies.length),
    });
    summaryTable.addRow({
      metric: "Used Modules",
      value: chalk.green(usedModules.length),
    });
    summaryTable.addRow({
      metric: "Unused Modules",
      value: unusedModules.length > 0 ? chalk.red(unusedModules.length) : chalk.green(unusedModules.length),
    });

    summaryTable.printTable();

    // Final message
    if (unusedModules.length > 0) {
      console.log(chalk.yellow(`\n💡 Tip: Review these modules before removing to ensure they're truly unused.\n`));
    }
  } catch (error) {
    console.log(chalk.bold.red(`\n❌ Error: ${error instanceof Error ? error.message : String(error)}\n`));
  }
};
