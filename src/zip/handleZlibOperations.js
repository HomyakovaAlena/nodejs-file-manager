import { createBrotliCompress } from "node:zlib";
import { createBrotliDecompress } from "node:zlib";

import { pipeline } from "node:stream";
import { createReadStream, createWriteStream } from "node:fs";
import { promisify } from "node:util";
import * as path from "path";

import { finished } from "stream";
const finishedAsync = promisify(finished);

export const compress = async (filePath, destinationPath) => {
  const [resolvedFilePath, resolvedDestinationPath] = [
    path.resolve(filePath),
    path.resolve(destinationPath),
  ];
  const compress = createBrotliCompress();
  const source = createReadStream(resolvedFilePath);
  const destination = createWriteStream(resolvedDestinationPath);

  pipeline(source, compress, destination, (err) => {
    // await finishedAsync(destination);
    if (err) {
      console.error("An error occurred:", err);
      process.exitCode = 1;
    } else {
      console.log(`compress done, check here: ${resolvedDestinationPath}`);
    }
  });
};

export const decompress = async (filePath, destinationPath) => {
  const [resolvedFilePath, resolvedDestinationPath] = [
    path.resolve(filePath),
    path.resolve(destinationPath),
  ];
  const decompress = createBrotliDecompress();
  const source = createReadStream(resolvedFilePath);
  const destination = createWriteStream(resolvedDestinationPath);

  pipeline(source, decompress, destination, (err) => {
    // await finishedAsync(destination);
    if (err) {
      console.error("An error occurred:", err);
      process.exitCode = 1;
    } else {
      console.log(`decompress done, check here: ${resolvedDestinationPath}`);
    }
  });
};
