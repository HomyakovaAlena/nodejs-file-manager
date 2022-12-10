import * as os from "os";
import * as path from "path";
import * as fs from "node:fs/promises";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { createRequire } from "module";
import { Console } from "console";
import url from "node:url";

export const getCwd = () => {
  const resolvedPath = path.resolve(process.cwd());
  return resolvedPath;
};

export const getHomeDirectory = () => {
  try {
    const homeDir = os.homedir();
    changeDirectory(homeDir);
  } catch (err) {
    console.error("error while changing directory");
  }
};

export const changeDirectory = (directoryPath) => {
  try {
    const resolvedPath = path.resolve(directoryPath);
    process.chdir(resolvedPath);

    // console.log(getCwd(), "           cwd");
    // console.log(import.meta.url, "           import.meta.url");
    // const __filename = fileURLToPath(import.meta.url);
    // console.log(__filename, "           __filename");
    // const __dirname1 = dirname(__filename);
    // console.log(__dirname1, "             __dirname1");
    // const __dirname2 = url.fileURLToPath(new URL(".", import.meta.url));
    // console.log(__dirname2, "             __dirname2");
    // const __dirname3 = dirname(fileURLToPath(import.meta.url));
    // console.log(__dirname3, "             __dirname3");
    // const filePath = path.join(__dirname, "files", "fileToRead.txt");
    // const sourceFile = path.resolve(__dirname, "files", "fileToRead.txt");
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
