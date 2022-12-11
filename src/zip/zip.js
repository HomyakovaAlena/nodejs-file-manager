import { createBrotliCompress } from "node:zlib";
import { createBrotliDecompress } from "node:zlib";
import { pipeline } from "node:stream";
import { createReadStream, createWriteStream } from "node:fs";
import * as path from "path";
import { executionErrorLog } from "../messageLogger/errorLogger.js";
import { returnIfNotExists } from "../utils/utils.isFileExists.js";
import { cleanUp } from "./utils.zip.js";
import { handleZlibErrors } from "./utils.zip.js";
const [COMPRESS, DECOMPRESS] = ["compress", "decompress"];

export const compress = async (filePath, destinationPath) => {
  try {
    await returnIfNotExists(filePath);
    const [resolvedFilePath, resolvedDestinationPath] = [
      path.resolve(filePath),
      path.resolve(destinationPath),
    ];

    const compress = createBrotliCompress();
    const source = createReadStream(resolvedFilePath);
    const destination = createWriteStream(resolvedDestinationPath, {
      flags: "wx",
    });

    pipeline(source, compress, destination, (err) => {
      handleZlibErrors(
        [source, compress, destination],
        err,
        COMPRESS,
        resolvedDestinationPath
      );
    });

    await cleanUp([source, compress, destination]);
  } catch (err) {
    executionErrorLog();
  }
};

export const decompress = async (filePath, destinationPath) => {
  try {
    await returnIfNotExists(filePath);
    const [resolvedFilePath, resolvedDestinationPath] = [
      path.resolve(filePath),
      path.resolve(destinationPath),
    ];

    const decompress = createBrotliDecompress();
    const source = createReadStream(resolvedFilePath);
    const destination = createWriteStream(resolvedDestinationPath, {
      flags: "wx",
    });

    pipeline(source, decompress, destination, (err) => {
      handleZlibErrors(
        [source, decompress, destination],
        err,
        DECOMPRESS,
        resolvedDestinationPath
      );
    });

    await cleanUp([source, decompress, destination]);
  } catch (err) {
    executionErrorLog();
  }
};
