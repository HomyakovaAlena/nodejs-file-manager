import * as os from "os";
import * as path from "path";
import * as fs from "node:fs/promises";
import { executionErrorLog } from "../messageLogger/errorLogger.js";

export const getCwd = () => {
  const resolvedPath = path.resolve(process.cwd());
  return resolvedPath;
};

export const getHomeDirectory = () => {
  try {
    const homeDir = os.homedir();
    changeDirectory(homeDir);
  } catch (err) {
    executionErrorLog();
  }
};

export const changeDirectory = (directoryPath) => {
  try {
    const resolvedPath = path.resolve(directoryPath);
    process.chdir(resolvedPath);
  } catch (err) {
    executionErrorLog();
  }
};

export const goUp = () => {
  try {
    const cwd = getCwd();
    const newPath = path.join(cwd, "../");
    changeDirectory(newPath);
  } catch (err) {
    executionErrorLog();
  }
};

export const list = async () => {
  try {
    const files = await fs.readdir(getCwd(), {
      withFileTypes: true,
    });
    const tabularData = [];
    files.forEach((entry) => {
      const type = entry.isDirectory() ? "directory" : "file";
      tabularData.push({ Name: entry.name, Type: type });
    });
    const sortedData = tabularData.sort(
      (a, b) => a.Type.localeCompare(b.Type) || a.Name.localeCompare(b.Name)
    );
    console.table(sortedData);
  } catch (err) {
    executionErrorLog();
  }
};
