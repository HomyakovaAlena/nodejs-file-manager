import * as readline from "node:readline/promises";
import { chooseAction } from "../controller/chooseAction.js";
import { sayGoodbye } from "../messageLogger/politeLogger.js";
import { getCwd } from "../navigation/navigate.js";
import { directoryLog } from "../messageLogger/directoryLogger.js";
import { executionErrorLog } from "../messageLogger/errorLogger.js";

const PROMPT = `\nWaiting for your instructions, Commander!..> `;

export const prompt = async (username) => {
  try {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: PROMPT,
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
      sayGoodbye(username);
      process.exit(0);
    });
  } catch (err) {
    executionErrorLog();
  }
};
