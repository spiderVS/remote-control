export const parseCommand = (cmd: string): [string, number | null, number | null] => {
  const cmdWithArgs = cmd.split(' ');
  const [command, arg1, arg2] = cmdWithArgs;
  return [
    command,
    arg1 ? +arg1 : null,
    arg2 ? +arg2 : null
  ];
};
