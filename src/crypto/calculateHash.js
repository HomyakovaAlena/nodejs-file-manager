import { createHash } from "node:crypto";
import * as fs from "node:fs/promises";
import * as path from "path";

export const readFile = async (filePath) => {
  try {
    const resolvedPAth = path.resolve(filePath);
    const data = await fs.readFile(resolvedPAth);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const calculateHash = async (filePath) => {
  try {
    const resolvedPAth = path.resolve(filePath);
    const fileToHash = await readFile(resolvedPAth);
    const hash = createHash("sha256");
    hash.update(fileToHash);
    console.log(hash.digest("hex"));
  } catch (error) {
    throw new Error("FS operation failed");
  }
};
