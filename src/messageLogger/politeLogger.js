const WELCOME = "Welcome to the File Manager,";
const THANKS = "\nThank you for using File Manager,";
const BYE = "goodbye!";

export const greet = (username) => {
  console.log(`${WELCOME} ${username}!`);
};

export const sayGoodbye = (username) => {
  console.log(`${THANKS} ${username}, ${BYE}`);
};
