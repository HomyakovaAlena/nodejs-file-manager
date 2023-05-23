import { createReadStream, createWriteStream } from "node:fs";
import { getCwd } from "../navigation/navigate.js";
import * as path from "path";
import * as fs from "node:fs/promises";
import { promisify } from "node:util";
import { executionErrorLog } from "../messageLogger/errorLogger.js";
import { finished } from "stream";
import { isFileExists } from "../utils/utils.isFileExists.js";
const finishedAsync = promisify(finished);

export const cat = async (filePath) => {
  const resolvedPath = path.resolve(filePath);
  const readable = createReadStream(resolvedPath, "utf-8");
  const writable = process.stdout;
  try {
    readable.pipe(writable);
    await finishedAsync(readable);
  } catch (err) {
    executionErrorLog();
  }
};

export const add = async (fileName) => {
  try {
    const cwd = getCwd();
    const newPath = path.join(cwd, fileName);
    await fs.writeFile(newPath, "", { flag: "wx" });
  } catch (error) {
    executionErrorLog();
  }
};

export const rename = async (filePath, newFileName) => {
  try {
    const resolvedPath = path.resolve(filePath);
    const directoryPath = path.basename(path.dirname(resolvedPath));
    const newPath = path.join(directoryPath, newFileName);

    const isSameFileExists = await isFileExists(newPath);
    if (isSameFileExists) {
      executionErrorLog();
      return;
    }

    await fs.rename(resolvedPath, newPath);
  } catch (error) {
    executionErrorLog();
  }
};

export const copy = async (filePath, directoryPath) => {
  try {
    const isSameFileExists = await isFileExists(filePath);
    if (!isSameFileExists) {
      executionErrorLog();
      return;
    }
    const [resolvedFilePath, resolvedDirPath] = [
      path.resolve(filePath),
      path.resolve(directoryPath),
    ];
    const fileName = path.basename(resolvedFilePath);
    const newPath = path.join(resolvedDirPath, fileName);

    const inputStream = createReadStream(resolvedFilePath).on("error", () => {
      inputStream.close();
    });
    const outputStream = createWriteStream(newPath).on("error", () => {
      outputStream.close();
      inputStream.close();
    });

    inputStream.pipe(outputStream);
    await finishedAsync(inputStream, { cleanup: true });
    await finishedAsync(outputStream, { cleanup: true });
  } catch (error) {
    executionErrorLog();
  }
};

export const rm = async (filePath) => {
  try {
    const resolvedPath = path.resolve(filePath);
    await fs.unlink(resolvedPath);
  } catch (error) {
    executionErrorLog();
  }
};

export const move = async (filePath, directoryPath) => {
  try {
    const [resolvedFilePath, resolvedDirPath] = [
      path.resolve(filePath),
      path.resolve(directoryPath),
    ];
    const fileName = path.basename(resolvedFilePath);
    const newPath = path.join(resolvedDirPath, fileName);

    await copy(resolvedFilePath, resolvedDirPath);
    const isSameFileExists = await isFileExists(newPath);
    if (isSameFileExists) {
      await rm(resolvedFilePath);
    }
  } catch {
    return;
  }
};
