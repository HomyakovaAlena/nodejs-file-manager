import { createReadStream, createWriteStream } from "node:fs";
import { getCwd } from "../navigation/navigate.js";
import * as path from "path";
import * as fs from "node:fs/promises";
import { promisify } from "node:util";
import { executionErrorLog } from "../messageLogger/errorLogger.js";
import { finished } from "stream";
const finishedAsync = promisify(finished);

export const isFileExists = async (filePath) => {
  try {
    const resolvedPath = path.resolve(filePath);
    await fs.access(resolvedPath);
    return true;
  } catch (error) {
    return false;
  }
};

export const cat = async (filePath) => {
  const resolvedPath = path.resolve(filePath);
  const readable = createReadStream(resolvedPath, "utf-8");
  const writable = process.stdout;
  try {
    // let body = "";

    // readable.on("data", (chunk) => {
    //   body += chunk.toString();
    // });
    // readable.on("end", () => {
    //   writable.write(body);
    // });
    readable.pipe(writable);
    await finishedAsync(readable);
  } catch (err) {
    console.log(err);
  }
};

export const add = async (fileName) => {
  try {
    const cwd = getCwd();
    const newPath = path.join(cwd, fileName);
    await fs.writeFile(newPath, "", { flag: "wx" });
  } catch (error) {
    console.log(error);
    throw new Error("FS operation failed");
  }
};

export const rename = async (filePath, newFileName) => {
  try {
    const resolvedPath = path.resolve(filePath);
    const directoryPath = path.join(resolvedPath, "../");
    const newPath = path.join(directoryPath, newFileName);

    const isSameFileExists = await isFileExists(newPath);
    if (isSameFileExists) {
      throw new Error("FS operation failed");
    }

    await fs.rename(resolvedPath, newPath);
  } catch (error) {
    console.log(error);
    throw new Error("FS operation failed");
  }
};

export const copy = async (filePath, directoryPath) => {
  const [resolvedFilePath, resolvedDirPath] = [
    path.resolve(filePath),
    path.resolve(directoryPath),
  ];
  const inputStream = createReadStream(resolvedFilePath);
  const fileName = path.basename(resolvedFilePath);
  const newPath = path.join(resolvedDirPath, fileName);
  const outputStream = createWriteStream(newPath);
  try {
    inputStream.pipe(outputStream);
  } catch (error) {
    console.log(error);
  }
};

export const rm = async (filePath) => {
  try {
    const resolvedPath = path.resolve(filePath);
    await fs.unlink(resolvedPath);
  } catch (error) {
    console.log(error);
  }
};

export const move = async (filePath, directoryPath) => {
  try {
    const [resolvedFilePath, resolvedDirPath] = [
      path.resolve(filePath),
      path.resolve(directoryPath),
    ];
    await copy(resolvedFilePath, resolvedDirPath);
    await rm(resolvedFilePath);
  } catch (error) {
    console.log(error);
  }
};
