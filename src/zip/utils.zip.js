import { promisify } from "node:util";
import { finished } from "stream";
const finishedAsync = promisify(finished);

const COMPRESS_SUCCESS_MESSAGE = `Compress done, check here:`;
const DECOMPRESS_SUCCESS_MESSAGE = `Decompress done, check here:`;

export const cleanUp = async (streamsArray) => {
  for await (const stream of streamsArray) {
    await finishedAsync(stream, { cleanup: true });
  }
};

export const handleZlibErrors = (
  streamsArray,
  err,
  operation,
  resolvedDestinationPath
) => {
  if (err) {
    streamsArray.forEach((stream) => stream.close());
  } else {
    operation === "compress"
      ? console.log(`${COMPRESS_SUCCESS_MESSAGE} ${resolvedDestinationPath}`)
      : console.log(`${DECOMPRESS_SUCCESS_MESSAGE} ${resolvedDestinationPath}`);
  }
};
