import os from "node:os";
import { wrongCommandLog } from "../messageLogger/errorLogger.js";

const getEOL = () => {
  console.log(JSON.stringify(os.EOL));
};

const getCPUs = () => {
  const cpus = os.cpus();
  console.log(`Overall amount of CPUs: ${cpus.length}.`);
  cpus.forEach((cpu, index) =>
    console.log(
      `${index + 1}) model: ${cpu.model}, speed: ${cpu.speed / 1000}GHz`
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
    case "--EOL":
      getEOL();
      break;
    case "--cpus":
      getCPUs();
      break;
    case "--homedir":
      getHomeDir();
      break;
    case "--username":
      getUsername();
      break;
    case "--architecture":
      getCPUArchitecture();
      break;
    default:
      wrongCommandLog();
  }
};
