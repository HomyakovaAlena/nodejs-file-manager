import { parseUsername } from "../cli/parseUsername.js";
import { getHomeDirectory } from "../navigation/navigate.js";
import { greet } from "../messageLogger/politeLogger.js";
import { prompt } from "../prompt/prompt.js";

export const init = () => {
  const username = parseUsername();
  greet(username);
  //TODO: errors + ways to give arguments + don't finish the program after greeting + writestream or stdout;

  getHomeDirectory();
  prompt(username);
};

init();
