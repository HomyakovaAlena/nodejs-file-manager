const WRONG_CMD_MESSAGE = "Invalid input";
const EXECUTION_ERROR_MESSAGE = "Operation failed";

export const wrongCommandLog = () => {
  console.log(WRONG_CMD_MESSAGE);
};

export const executionErrorLog = () => {
  console.log(EXECUTION_ERROR_MESSAGE);
};
