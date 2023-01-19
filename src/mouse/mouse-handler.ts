import { mouse, left, right, up, down } from '@nut-tree/nut-js';

export const mouseHandler = async (
  command: string,
  arg1?: number
) => {

  switch (command) {
    case 'mouse_up':
      arg1 && await mouse.move(up(arg1));
      break;
    case 'mouse_down':
      arg1 && await mouse.move(down(arg1));
      break;
    case 'mouse_left':
      arg1 && await mouse.move(left(arg1));
      break;
    case 'mouse_right':
      arg1 && await mouse.move(right(arg1));
      break;
    case 'mouse_position':
      const { x, y } = await mouse.getPosition();
      return `mouse_position ${x},${y}`;
      break;

    default:
      break;
  }

}
