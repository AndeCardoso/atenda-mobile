export const SuperConsole = (value: any, title?: string) => {
  return console.log(title, JSON.stringify(value, null, 2));
};
