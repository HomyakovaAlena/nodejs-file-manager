import os from "node:os";
import { wrongCommandLog } from "../messageLogger/errorLogger.js";

const [EOL, CPUS, HOME_DIR, USERNAME, ARCHITECTURE] = [
  "--EOL",
  "--cpus",
  "--homedir",
  "--username",
  "--architecture",
];
const CPU_MESSAGE = "Overall amount of CPUs:";

const getEOL = () => {
  console.log(JSON.stringify(os.EOL));
};

const getCPUs = () => {
  const cpus = os.cpus();
  console.log(`${CPU_MESSAGE} ${cpus.length}.`);
  cpus.forEach((cpu, index) =>
    console.log(
      `${index + 1}) model: ${cpu.model}, clock rate: ${cpu.speed / 1000}GHz`
    )
  );
};

const getHomeDir = () => {
  const homeDir = os.homedir();
  console.log(homeDir);
};

const getUsername = () => {
  const username = os.userInfo().username;
  console.log(username);
};

const getCPUArchitecture = () => {
  const architecture = os.arch();
  console.log(architecture);
};

export const handleOScommands = (args) => {
  switch (args) {
    case EOL:
      getEOL();
      break;
    case CPUS:
      getCPUs();
      break;
    case HOME_DIR:
      getHomeDir();
      break;
    case USERNAME:
      getUsername();
      break;
    case ARCHITECTURE:
      getCPUArchitecture();
      break;
    default:
      wrongCommandLog();
  }
};
