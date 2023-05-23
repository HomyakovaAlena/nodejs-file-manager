const DEFAULT_USER = "Lone Wanderer";
const USERNAME_ARG = "--username=";

export const parseUsername = () => {
  try {
    const username = process.argv
      .slice(2)
      .find((item) => item.startsWith(USERNAME_ARG))
      .slice(USERNAME_ARG.length);
    return username;
  } catch (err) {
    return DEFAULT_USER;
  }
};
