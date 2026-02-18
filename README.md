# 🔍 Unused File Detector

A powerful CLI tool to detect unused exported files in your TypeScript/JavaScript projects. Keep your codebase clean by identifying files that are exported but never imported anywhere.

## ✨ Features

- 🎯 Detects files with exports that are never imported
- 📊 Beautiful terminal UI with progress indicators
- 📋 Clean table output showing all unused files
- 🚀 Fast and efficient scanning
- 💡 Smart detection of `index.ts/tsx` files
- 🎨 Color-coded results for better readability

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
unused-files
```

### Local Installation

Add to your `package.json` scripts:

```json
{
  "scripts": {
    "check-unused": "unused-files"
  }
}
```

Then run:

```bash
npm run check-unused
```

## 📖 How It Works

1. **Scans** all TypeScript/JavaScript files in your `src` directory
2. **Identifies** files that contain export statements
3. **Checks** if these exported files are imported anywhere in the codebase
4. **Reports** files that are exported but never used

### Supported File Types

- `.ts` - TypeScript
- `.tsx` - TypeScript React
- `.js` - JavaScript
- `.jsx` - JavaScript React
- `.png`, `.jpg`, `.jpeg`, `.gif`, `.svg` - Image files

## 📋 Example Output

```
🔍 Unused File Detector

✔ Found 178 files to analyze
✔ Found 160 files with exports
✔ Analysis complete!

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

## 🎯 Use Cases

- **Code Cleanup**: Remove dead code from your project
- **Refactoring**: Identify components that can be safely deleted
- **Code Reviews**: Ensure new code doesn't introduce unused files
- **CI/CD**: Add to your pipeline to prevent unused code from being merged

## ⚙️ Configuration

Currently, the tool scans the `src` directory by default and ignores:

- `node_modules/`
- `dist/`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

MIT

## 🐛 Known Limitations

- Only detects direct imports (not dynamic imports with variables)
- Does not analyze import statements that use path aliases (coming soon)
- Entry point files (like `src/App.tsx`, `src/index.ts`) are included in the scan

## 💡 Tips

- Run this tool regularly during development to keep your codebase clean
- Always review the results before deleting files
- Some files might be used by external tools or testing frameworks
- Consider adding this to your pre-commit hooks

## 🔮 Future Enhancements

- [ ] Support for path aliases (`@/components`)
- [ ] Configuration file support
- [ ] Exclude patterns
- [ ] Export to JSON/CSV
- [ ] Integration with popular bundlers
- [ ] Detection of unused exports within files

---

Made with ❤️ by Abdullah Ayoola
