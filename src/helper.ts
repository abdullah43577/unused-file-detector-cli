import * as path from "path";

export const regexExport = [
  /export\s+default/, // export default
  /export\s+{/, // export { ... }
  /export\s+(const|let|var|function|class)/, // export const/let/var/function/class
  /export\s+\*/, // export * from
];

export const regexImport = [
  /import\s+.*?['"](.+?)['"]/g, // import ... from '...'
  /require\(['"](.+?)['"]\)/g, // require('...')
  /import\(['"](.+?)['"]\)/g, // dynamic import('...')
];

// Check if file has any exports
export const hasExports = (content: string): boolean => {
  return regexExport.some(pattern => pattern.test(content));
};

// Check if file is imported in the content of another file
export const checkFileIsImportedHere = ({ content, filePath }: { content: string; filePath: string }): boolean => {
  return regexImport.some(pattern => {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      const importedFile = match[1] as string;
      if (importedFile.includes(filePath)) {
        return true;
      }
    }
    return false;
  });
};

// Add this function to get the correct name to search for
export const getFileNameToSearch = (filePath: string): string => {
  const fileName = path.basename(filePath, path.extname(filePath)); // e.g., "index" or "Button"

  // If it's an index file, use the parent directory name instead
  if (fileName === "index") {
    const parentDir = path.dirname(filePath); // e.g., "src/components/Button"
    return path.basename(parentDir); // e.g., "Button"
  }

  return fileName;
};
