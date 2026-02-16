#!/usr/bin/env node

import { glob } from "glob";
import * as path from "path";
import * as fs from "fs";
import chalk from "chalk";
import ora from "ora";
import { Table } from "console-table-printer";
import { checkFileIsImportedHere, getFileNameToSearch, hasExports } from "./helper.js";

const detectUnusedFilesInDirectory = async function (directory: string) {
  try {
    console.log(chalk.bold.cyan("\n🔍 Unused File Detector\n"));
    console.log(chalk.gray(`Scanning directory: ${directory}\n`));

    // Step 1: Find all files
    const findFilesSpinner = ora("Scanning project files...").start();
    const allFiles = await glob("./src/**/*.{ts,tsx,js,jsx,png,jpg,jpeg,gif,svg}", {
      ignore: ["node_modules/**", "dist/**"],
    });
    findFilesSpinner.succeed(chalk.green(`Found ${allFiles.length} files to analyze`));

    // Step 2: Filter files with exports
    const exportSpinner = ora("Detecting files with exports...").start();
    const filesWithExports: string[] = [];

    allFiles.forEach(file => {
      const content = fs.readFileSync(file, "utf-8");
      if (hasExports(content)) {
        filesWithExports.push(file);
      }
    });

    exportSpinner.succeed(chalk.green(`Found ${filesWithExports.length} files with exports`));

    // Step 3: Check for unused files
    const unusedFiles: string[] = [];
    const processedFiles: string[] = [];

    console.log(chalk.bold.yellow(`\n📊 Analyzing imports...\n`));

    const progressSpinner = ora({
      text: "Processing files...",
      spinner: "dots",
    }).start();

    let processed = 0;
    filesWithExports.forEach(file => {
      processed++;
      const percentage = Math.round((processed / filesWithExports.length) * 100);
      progressSpinner.text = `Processing ${processed}/${filesWithExports.length} (${percentage}%): ${chalk.gray(path.basename(file))}`;

      let isImportedAnywhere = false;
      const fileNameToSearch = getFileNameToSearch(file);

      // Check if THIS file is imported in ANY other file
      filesWithExports
        .filter(f => f !== file)
        .forEach(otherFile => {
          const otherContent = fs.readFileSync(otherFile, "utf-8");

          const hasImport = checkFileIsImportedHere({
            content: otherContent,
            filePath: fileNameToSearch,
          });

          if (hasImport) {
            isImportedAnywhere = true;
          }
        });

      if (isImportedAnywhere) {
        processedFiles.push(file);
      } else {
        unusedFiles.push(file);
      }
    });

    progressSpinner.succeed(chalk.green(`Analysis complete!`));

    // Step 4: Display results
    console.log(chalk.bold.cyan("\n📋 Results:\n"));

    if (unusedFiles.length === 0) {
      console.log(chalk.green("✨ No unused files found! Your codebase is clean.\n"));
    } else {
      console.log(chalk.red(`⚠️  Found ${unusedFiles.length} unused file(s):\n`));

      const table = new Table({
        columns: [
          { name: "index", alignment: "right", title: chalk.bold("#"), color: "gray" },
          { name: "filePath", alignment: "left", title: chalk.bold("File Path"), color: "yellow" },
          { name: "componentName", alignment: "left", title: chalk.bold("Component"), color: "cyan" },
          { name: "type", alignment: "center", title: chalk.bold("Type"), color: "magenta" },
        ],
      });

      unusedFiles.forEach((file, index) => {
        const fileName = getFileNameToSearch(file);
        const fileType = path.extname(file);
        table.addRow({
          index: index + 1,
          filePath: file,
          componentName: fileName,
          type: fileType,
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
      metric: "Total Files Scanned",
      value: chalk.blue(allFiles.length),
    });
    summaryTable.addRow({
      metric: "Files with Exports",
      value: chalk.blue(filesWithExports.length),
    });
    summaryTable.addRow({
      metric: "Files in Use",
      value: chalk.green(processedFiles.length),
    });
    summaryTable.addRow({
      metric: "Unused Files",
      value: unusedFiles.length > 0 ? chalk.red(unusedFiles.length) : chalk.green(unusedFiles.length),
    });

    summaryTable.printTable();

    // Final message
    if (unusedFiles.length > 0) {
      console.log(chalk.yellow(`\n💡 Tip: Review these files before deleting to ensure they're truly unused.\n`));
    }
  } catch (error) {
    console.log(chalk.bold.red(`\n❌ Error: ${error instanceof Error ? error.message : String(error)}\n`));
    process.exit(1);
  }
};

detectUnusedFilesInDirectory(process.cwd());
