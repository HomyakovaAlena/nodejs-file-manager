const SPECIAL_SYMBOLS = `'"`;

const parseArgs = (argsString, sep) => {
  return argsString
    .split(sep)
    .filter((item) => item)
    .map((item) => item.trim());
};

const parseSpecSymbols = (argsString) =>
  [...SPECIAL_SYMBOLS].every((symbol) => !argsString.includes(symbol));

export const parseCommand = (command) => {
  const commandNormalized = command.trim();
  const spaceIndex = commandNormalized.indexOf(" ");
  if (spaceIndex === -1) {
    return [commandNormalized, []];
  }
  const cmd = commandNormalized.slice(0, spaceIndex);
  const argsString = commandNormalized.slice(spaceIndex).trim();
  let args = [];

  const isNoSpecSymbols = parseSpecSymbols(argsString);

  if (isNoSpecSymbols) {
    return argsString.includes(" ")
      ? [cmd, parseArgs(argsString, " ")]
      : [cmd, [argsString]];
  } else {
    [...SPECIAL_SYMBOLS].forEach((symbol) => {
      if (argsString.includes(symbol)) {
        args = parseArgs(argsString, symbol);
      }
    });
    return [cmd, args];
  }
};
