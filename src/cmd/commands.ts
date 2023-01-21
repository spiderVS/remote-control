import { drawHandler } from '../draw/draw';
import { parseCommand } from '../helpers/helpers';
import { mouseHandler } from '../mouse/mouse';
import { psHandler } from '../ps/printScreen';

export const runCommand = async (cmd: string) => {
  const [command, arg1, arg2] = parseCommand(cmd.toString());

  if (command === 'mouse_up' || command === 'mouse_down' || command === 'mouse_left' || command === 'mouse_right') {
    mouseHandler(command, arg1);
  } else if (command === 'mouse_position') {
    const posStr = (await mouseHandler(command)) as string;
    return posStr;
  } else if (command.startsWith('draw')) {
    await drawHandler(command, arg1, arg2);
  } else if (command === 'prnt_scrn') {
    const base64stringPNG = await psHandler();
    return `prnt_scrn ${base64stringPNG}`;
  }
};
