import { goUp } from "../navigation/navigate.js";
import { changeDirectory } from "../navigation/navigate.js";
import { list } from "../navigation/navigate.js";
import { wrongCommandLog } from "../messageLogger/errorLogger.js";
import { sayGoodbye } from "../messageLogger/politeLogger.js";
import { cat, add, rename, copy, move, rm } from "../fs/operateFiles.js";
import { handleOScommands } from "../os/os.js";
import { hash } from "../crypto/hash.js";
import { compress, decompress } from "../zip/zip.js";
import { helpLog } from "../messageLogger/helpLogger.js";
import { parseCommand } from "./utils.controller.js";

const [HELP, UP, CD, LS, CAT, ADD] = ["help", "up", "cd", "ls", "cat", "add"];
const [RN, CP, MV, RM, OS, HASH] = ["rn", "cp", "mv", "rm", "os", "hash"];
const [COMPRESS, DECOMPRESS, EXIT] = ["compress", "decompress", ".exit"];

export const chooseAction = async (command, username) => {
  const [cmd, args] = parseCommand(command);
  switch (cmd) {
    case UP:
      goUp();
      break;
    case CD:
      changeDirectory(...args);
      break;
    case LS:
      await list();
      break;
    case CAT:
      await cat(...args);
      break;
    case ADD:
      await add(...args);
      break;
    case RN:
      await rename(...args);
      break;
    case CP:
      await copy(...args);
      break;
    case MV:
      await move(...args);
      break;
    case RM:
      await rm(...args);
      break;
    case OS:
      handleOScommands(...args);
      break;
    case HASH:
      await hash(...args);
      break;
    case COMPRESS:
      await compress(...args);
      break;
    case DECOMPRESS:
      await decompress(...args);
      break;
    case HELP:
      helpLog();
      break;
    case EXIT:
      sayGoodbye(username);
      process.exit(0);
    default:
      wrongCommandLog();
  }
};
