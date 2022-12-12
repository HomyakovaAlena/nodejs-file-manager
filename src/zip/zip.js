import { createBrotliCompress } from "node:zlib";
import { createBrotliDecompress } from "node:zlib";
import { pipeline } from "node:stream";
import { createReadStream, createWriteStream } from "node:fs";
import * as path from "path";
import { executionErrorLog } from "../messageLogger/errorLogger.js";
import { cleanUp } from "./utils.zip.js";
import { handleZlibErrors } from "./utils.zip.js";
import { COMPRESS, DECOMPRESS } from "./utils.zip.js";

export const compress = async (filePath, destinationPath) => {
  try {
    const [resolvedFilePath, resolvedDestinationPath] = [
      path.resolve(filePath),
      path.resolve(destinationPath),
    ];

    const compress = createBrotliCompress();
    const source = createReadStream(resolvedFilePath);
    const destination = createWriteStream(resolvedDestinationPath, {
      flags: "wx",
    });
    const streamsArray = [source, compress, destination];
    pipeline(...streamsArray, (err) => {
      handleZlibErrors(streamsArray, err, COMPRESS, resolvedDestinationPath);
    });

    await cleanUp(streamsArray);
  } catch (err) {
    executionErrorLog();
  }
};

export const decompress = async (filePath, destinationPath) => {
  try {
    const [resolvedFilePath, resolvedDestinationPath] = [
      path.resolve(filePath),
      path.resolve(destinationPath),
    ];

    const decompress = createBrotliDecompress();
    const source = createReadStream(resolvedFilePath);
    const destination = createWriteStream(resolvedDestinationPath, {
      flags: "wx",
    });

    const streamsArray = [source, decompress, destination];
    pipeline(...streamsArray, (err) => {
      handleZlibErrors(streamsArray, err, DECOMPRESS, resolvedDestinationPath);
    });

    await cleanUp(streamsArray);
  } catch (err) {
    executionErrorLog();
  }
};
