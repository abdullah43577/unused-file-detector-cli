````markdown
# @reactmode/unused-check

Detect unused JavaScript and TypeScript files in your React / Next.js projects.

This CLI scans your project, resolves local imports (including `tsconfig` path aliases), and reports files that are never referenced anywhere in your codebase.

---

## 🚀 Installation

### Run with npx (recommended)

```bash
npx @reactmode/unused-file-detector
```
````

### Install globally

```bash
npm i @reactmode/unused-file-detector
```

Then run:

```bash
unused-check
```

---

## 🎯 What It Does

- Recursively scans `.ts`, `.tsx`, `.js`, `.jsx` files
- Resolves:
  - Relative imports (`./component`)
  - Index files (`./folder/index.ts`)
  - `export ... from`
  - `require()`
  - `tsconfig.json` path aliases

- Ignores:
  - `node_modules`
  - `dist`
  - `public`

- Detects files that are never imported anywhere
- Reports unused files clearly in the terminal

---

## 📁 Supported Projects

- React
- Next.js (pages router & app router)
- TypeScript projects
- JavaScript projects

---

## 🧠 How It Works

1. Collects all source files in the project.
2. Reads each file and extracts import statements.
3. Resolves imports to actual file paths.
4. Builds a dependency map.
5. Flags files that are never referenced.

---

## 🛠 Example Output

### ✅ No Unused Files

```
Scanning 84 files...

✔ No unused files found.
```

### 🚨 Unused Files Found

```
Scanning 84 files...

🚨 Unused files detected:

src/components/OldCard.tsx
src/utils/tempHelper.ts
src/hooks/useLegacyHook.ts
```

---

## 📦 Entry File Protection

Some files may not be imported directly but are still required by your framework. Common entry files are automatically protected, including:

- `pages/index.tsx`
- `app/layout.tsx`
- `app/page.tsx`
- `main.tsx`
- `index.tsx`
- `next.config.js`

---

## ⚠️ Limitations (Current Version)

- Does not yet parse AST (uses regex for import detection)
- Dynamic imports may not always be detected
- Assets referenced only in CSS or HTML may not be detected
- Files required at runtime outside static imports may be flagged

Future versions may introduce deeper static analysis.

---

## 🔄 Exit Behavior

Currently:

- Prints unused files to the console
- Does not automatically delete files
- Designed to be safe by default

---

## 💡 Why Use This?

In fast-moving frontend projects:

- Dead components accumulate
- Refactored files stay in the repo
- Bundle size increases silently
- Project structure becomes noisy

`unused-check` helps you:

- Clean your codebase
- Reduce technical debt
- Keep your project lean
- Improve maintainability

---

## 🛣 Roadmap

Planned improvements:

- `--json` output mode
- `--exclude` flag
- `--fix` (optional auto-delete)
- AST-based import parsing
- Image and asset usage detection
- Performance optimizations with concurrency

---

## 👤 Author

Built by ReactMode.

```

If you'd like, I can also help you write a sharper, more marketable version that positions this as part of a growing frontend quality toolkit instead of just a standalone utility.
```
