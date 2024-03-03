export const SuperConsole = (value: any) => {
  return console.log(JSON.stringify(value, null, 2));
};
