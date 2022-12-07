import { goUp } from "../navigation/navigate.js";
import { changeDirectory } from "../navigation/navigate.js";
import { list } from "../navigation/navigate.js";
import { wrongCommandLog } from "../messageLogger/errorLogger.js";
import { farewell } from "../messageLogger/politeLogger.js";

export const chooseAction = async (command, username = "Lone Wanderer") => {
  const [cmd, args] = command
    .trim()
    .split(" ")
    .map((item) => item.trim());
  switch (cmd) {
    case "up":
      goUp();
      break;
    case "cd":
      changeDirectory(args);
      break;
    case "ls":
      await list();
      break;
    case "exit":
      farewell(username);
      process.exit(0);
    default:
      wrongCommandLog();
  }
};
