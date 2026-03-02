#!/usr/bin/env node
import chalk from "chalk";
import { select, Separator } from "@inquirer/prompts";
import { detectUnusedFilesInDirectory } from "./functions/detectUnusedFilesInDirectory.js";
import { detectUnusedModules } from "./functions/detectUnusedModules.js";

// Main interactive function
const main = async () => {
  console.log(chalk.bold.blue("\n🚀 Welcome to the Unused Code Detector!\n"));

  try {
    const answer = await select({
      message: "What would you like to analyze?",
      choices: [
        {
          name: "Files",
          value: "files",
          description: "Analyze unused files in the project",
        },
        {
          name: "Modules",
          value: "modules",
          description: "Analyze unused modules/dependencies (package.json)",
        },
      ],
    });

    const currentDirectory = process.cwd();

    switch (answer) {
      case "files":
        await detectUnusedFilesInDirectory(currentDirectory);
        break;
      case "modules":
        await detectUnusedModules(currentDirectory);
        break;
      case "both":
        await detectUnusedFilesInDirectory(currentDirectory);
        await detectUnusedModules(currentDirectory);
        break;
      default:
        console.log(chalk.red("Invalid choice"));
        process.exit(1);
    }

    console.log(chalk.bold.green("\n✨ Thanks for using Unused Code Detector! 👋\n"));
  } catch (error) {
    console.log(chalk.bold.red(`\n❌ Error with interactive prompt: ${error instanceof Error ? error.message : String(error)}\n`));
    process.exit(1);
  }
};

// Start the interactive CLI
main().catch(error => {
  console.log(chalk.bold.red(`\n❌ Error: ${error instanceof Error ? error.message : String(error)}\n`));
  process.exit(1);
});
