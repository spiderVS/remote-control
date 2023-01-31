import { mouse, left, right, up, down } from '@nut-tree/nut-js';

export const mouseHandler = async (
  command: string,
  arg1: number | null = null
): Promise<void | string> => {

  if (command && arg1) {
    switch (command) {
      case 'mouse_up':
        await mouse.move(up(arg1));
        break;
      case 'mouse_down':
        await mouse.move(down(arg1));
        break;
      case 'mouse_left':
        await mouse.move(left(arg1));
        break;
      case 'mouse_right':
        await mouse.move(right(arg1));
        break;

      default:
        break;
    }

  } else if (command === 'mouse_position') {
    const { x, y } = await mouse.getPosition();
      return `mouse_position ${x},${y}`;
  }

}
