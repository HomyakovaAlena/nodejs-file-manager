import { createHash } from "node:crypto";
import { executionErrorLog } from "../messageLogger/errorLogger.js";
import { readFile } from "./utils.crypto.js";

export const hash = async (filePath) => {
  try {
    const fileToHash = await readFile(filePath);
    const hash = createHash("sha256");
    hash.update(fileToHash);
    console.log(hash.digest("hex"));
  } catch (error) {
    executionErrorLog();
  }
};
