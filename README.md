# 🔍 Unused Code Detector

A powerful CLI tool to detect unused code in your TypeScript/JavaScript projects. Keep your codebase clean by identifying unused files and dependencies that are no longer needed.

## ✨ Features

- 🎯 **Unused Files**: Detects files with exports that are never imported
- 📦 **Unused Dependencies**: Finds unused modules in package.json
- 🎮 **Interactive CLI**: Choose between analyzing files or dependencies
- 📊 Beautiful terminal UI with progress indicators and spinners
- 📋 Clean table output with detailed analysis results
- 🚀 Fast and efficient scanning with real-time progress
- 💡 Smart detection of `index.ts/tsx` files and dependency types
- 🎨 Color-coded results for better readability
- ⏱️ Performance timing for analysis operations

## 📦 Installation

### Global Installation (Recommended)

```bash
npm install -g unused-file-detector
```

### Local Installation

```bash
npm install unused-file-detector --save-dev
```

## 🚀 Usage

### Global Installation

Simply run the command in your project root:

```bash
unused-check
```

You'll be presented with an interactive menu:

```
🚀 Welcome to the Unused Code Detector!

? What would you like to analyze? (Use arrow keys)
❯ Files - Analyze unused files in the project
  Modules - Analyze unused modules/dependencies (package.json)
```

### Local Installation

Add to your `package.json` scripts:

```json
{
  "scripts": {
    "check-unused": "unused-check"
  }
}
```

Then run:

```bash
npm run check-unused
```

## 📖 How It Works

### File Analysis

1. **Scans** all TypeScript/JavaScript files in your `src` directory
2. **Identifies** files that contain export statements
3. **Checks** if these exported files are imported anywhere in the codebase
4. **Reports** files that are exported but never used

### Module Analysis

1. **Reads** your `package.json` for dependencies and devDependencies
2. **Scans** all source files for import statements
3. **Matches** imported modules against your package.json
4. **Reports** dependencies that are installed but never imported

### Supported File Types

- `.ts` - TypeScript
- `.tsx` - TypeScript React
- `.js` - JavaScript
- `.jsx` - JavaScript React
- `.png`, `.jpg`, `.jpeg`, `.gif`, `.svg` - Image files

## 📋 Example Output

### File Analysis

```
🔍 Unused File Detector

Scanning directory: /your/project/path

✔ Scanning project files... Found 178 files to analyze
✔ Detecting files with exports... Found 160 files with exports
✔ Analysis complete!
⏱️  Time taken: 2.34 seconds

📋 Results:

⚠️  Found 3 unused file(s):

┌───┬──────────────────────────────────────────┬───────────────┬────────┐
│ # │ File Path                                │ Component     │ Type   │
├───┼──────────────────────────────────────────┼───────────────┼────────┤
│ 1 │ src/components/OldButton/index.tsx       │ OldButton     │ .tsx   │
│ 2 │ src/utils/deprecatedHelper.ts            │ deprecated... │ .ts    │
│ 3 │ src/hooks/useOldFetch.ts                 │ useOldFetch   │ .ts    │
└───┴──────────────────────────────────────────┴───────────────┴────────┘

📈 Summary:

┌─────────────────────┬───────┐
│ Total Files Scanned │   178 │
│ Files with Exports  │   160 │
│ Files in Use        │   157 │
│ Unused Files        │     3 │
└─────────────────────┴───────┘

💡 Tip: Review these files before deleting to ensure they're truly unused.
```

### Module Analysis

```
🔍 Unused Module Detector

✔ Scanning project files... Found 45 files to scan
✔ Reading package.json... Found 23 modules to analyze
✔ Analysis complete!
⏱️  Time taken: 1.12 seconds

📋 Results:

⚠️  Found 2 unused module(s):

┌───┬─────────────────┬───────────────────┐
│ # │ Module Name     │ Dependency Type   │
├───┼─────────────────┼───────────────────┤
│ 1 │ lodash          │ dependency        │
│ 2 │ @types/jest     │ devDependency     │
└───┴─────────────────┴───────────────────┘

📈 Summary:

┌─────────────────┬─────┐
│ Total Modules   │  23 │
│ Dependencies    │  15 │
│ Dev Dependencies│   8 │
│ Used Modules    │  21 │
│ Unused Modules  │   2 │
└─────────────────┴─────┘

💡 Tip: Review these modules before removing to ensure they're truly unused.
```

## 🎯 Use Cases

- **Code Cleanup**: Remove dead code and unused dependencies from your project
- **Bundle Size Optimization**: Identify unused dependencies that bloat your bundle
- **Refactoring**: Safely identify components and modules that can be deleted
- **Code Reviews**: Ensure new code doesn't introduce unused files or dependencies
- **CI/CD**: Add to your pipeline to prevent unused code from being merged
- **Dependency Audit**: Regular cleanup of package.json dependencies
- **Project Migration**: Identify what can be safely removed when upgrading or migrating

## ⚙️ Configuration

Currently, the tool scans the `src` directory by default and ignores:

- `node_modules/`
- `dist/`

### File Analysis

- Scans: `./src/**/*.{ts,tsx,js,jsx,png,jpg,jpeg,gif,svg}`
- Detects exports in source files and checks for imports

### Module Analysis

- Reads: `package.json` dependencies and devDependencies
- Scans: `./src/**/*.{ts,tsx,js,jsx}` for import statements
- Matches: Module names against actual usage in code

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

MIT

## 🐛 Known Limitations

### File Detection

- Only detects direct imports (not dynamic imports with variables)
- Does not analyze import statements that use path aliases (coming soon)
- Entry point files (like `src/App.tsx`, `src/index.ts`) are included in the scan

### Module Detection

- Only checks for direct import statements (not require() or dynamic imports)
- Does not detect usage in configuration files (webpack, babel, etc.)
- May not detect modules used only in comments or documentation
- Doesn't analyze peer dependencies or optional dependencies

## 💡 Tips

- Run this tool regularly during development to keep your codebase clean
- Always review the results before deleting files or removing dependencies
- Some files might be used by external tools or testing frameworks
- Some dependencies might be used by bundlers, testing tools, or CI/CD scripts
- Consider adding this to your pre-commit hooks
- Use the interactive CLI to focus on specific areas (files vs dependencies)
- Check both files and modules for a comprehensive cleanup

## 🔮 Future Enhancements

### File Detection

- [ ] Support for path aliases (`@/components`)
- [ ] Detection of unused exports within files
- [ ] Support for dynamic imports

### Module Detection

- [ ] Detection of modules used in config files
- [ ] Support for monorepo workspaces
- [ ] Peer dependency analysis

### General

- [ ] Configuration file support
- [ ] Custom exclude patterns
- [ ] Export results to JSON/CSV
- [ ] Integration with popular bundlers
- [ ] CI/CD integration commands
- [ ] "Both" option to analyze files and modules together
- [ ] Dry-run mode with safe deletion suggestions

---

Made with ❤️ by Abdullah Ayoola
