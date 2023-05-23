import * as path from "path";
import * as fs from "node:fs/promises";

export const isFileExists = async (filePath) => {
  try {
    const resolvedPath = path.resolve(filePath);
    await fs.access(resolvedPath);
    return true;
  } catch (error) {
    return false;
  }
};
