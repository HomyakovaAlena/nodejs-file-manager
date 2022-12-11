import { parseUsername } from "./utils.start.js";
import { getHomeDirectory } from "../navigation/navigate.js";
import { greet } from "../messageLogger/politeLogger.js";
import { prompt } from "../prompt/prompt.js";

export const init = () => {
  const username = parseUsername();
  greet(username);
  getHomeDirectory();
  prompt(username);
};

init();
