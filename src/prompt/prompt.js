import * as readline from "node:readline/promises";
import { chooseAction } from "../cli/chooseAction.js";
import { farewell } from "../messageLogger/politeLogger.js";
import { getCwd } from "../navigation/navigate.js";
import { directoryLog } from "../messageLogger/directoryLogger.js";

export const prompt = async (username) => {
  try {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: `\nWaiting for your instructions, Сommander!..> `,
    });
    directoryLog(getCwd());
    rl.prompt();

    rl.on("line", async (line) => {
      await chooseAction(line, username)
        .catch((err) => console.log(err))
        .finally(() => {
          directoryLog(getCwd());
          rl.prompt();
        });
    });

    rl.on("close", () => {
      farewell(username);
      process.exit(0);
    });
  } catch (err) {
    console.error(err);
  }
};
