export const parseUsername = () => {
  // TODO: error handling, wrong args
  return process.argv
    .slice(2)
    .find((item) => item.startsWith("--username="))
    .split("=")
    .at(-1);
};
