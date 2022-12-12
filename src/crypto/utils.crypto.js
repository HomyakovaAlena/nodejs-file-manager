import * as fs from "node:fs/promises";
import * as path from "path";

export const readFile = async (filePath) => {
  try {
    const resolvedPAth = path.resolve(filePath);
    const data = await fs.readFile(resolvedPAth);
    return data;
  } catch (error) {
    executionErrorLog();
  }
};
