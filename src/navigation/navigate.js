import * as os from "os";
import * as path from "path";
import * as fs from "node:fs/promises";
// import { directoryLog } from "../messageLogger/directoryLogger.js";

export const getCwd = () => {
  return process.cwd();
};

export const getHomeDirectory = () => {
  changeDirectory(os.homedir());
};

export const changeDirectory = (path) => {
  try {
    process.chdir(path);
    // directoryLog(getCwd());
  } catch (err) {
    console.error("error while changing directory");
  }
};

export const goUp = () => {
  try {
    const cwd = getCwd();
    const newPath = path.join(cwd, "../");
    changeDirectory(newPath);
  } catch (err) {
    console.error("error while going up", err);
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
    throw new Error("FS operation failed");
  }
};
