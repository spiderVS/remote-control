import { mouse, left, right, up, down, Point, straightTo, centerOf, Region } from '@nut-tree/nut-js';
import path from 'path';

export const drawHandler = async (command: string, arg1: number | null = null, arg2: number | null = null) => {

  const center = await mouse.getPosition();

  if (command === 'draw_circle' && arg1) {
    mouse.config.mouseSpeed = 200;

    const path = getCirclePointsArray(center, arg1);
    const startPoint = path.shift();
    await mouse.move([startPoint as Point]);
    await mouse.drag(path);
    await mouse.move([center]);

  } else if (command === 'draw_rectangle' && arg1 && arg2) {
    let { x, y } = center;
    const path = [new Point(x = x + arg1, y), new Point(x, y = y + arg2), new Point(x = x - arg1, y), new Point(center.x, center.y)];


    /* --- var 1 - good work on Linux systems --- */
    // mouse.config.mouseSpeed = 200;
    // for (const point of path) {
    //   await mouse.drag(await straightTo(point));
    // }
    /* --- var 1 END --- */


    /* --- var 2 - good work on all systems --- */
    mouse.config.mouseSpeed = 3;
    await mouse.drag(path);
    /* --- var 2 END --- */

  }  else if (command === 'draw_square' && arg1) {
    let { x, y } = center;
    const path = [new Point(x = x + arg1, y), new Point(x, y = y + arg1), new Point(x = x - arg1, y), center];

    /* --- var 1 - good work on Linux systems --- */
    // mouse.config.mouseSpeed = 200;
    // for (const point of path) {
    //   await mouse.drag(await straightTo(point));
    // }
    /* --- var 1 END --- */


    /* --- var 2 - good work on all systems --- */
    mouse.config.mouseSpeed = 3;
    await mouse.drag(path);
    /* --- var 2 END --- */
  }
};

const getCirclePointsArray = ({ x, y }: Point, radius: number ) => {
  const array = [];
  const n = 180;
  for (let a = 0; a <= n ; a++) {
    array.push(
      new Point(
        (Math.cos(2 * Math.PI * a / n) * radius + 0.5) + x,
        (Math.sin(2 * Math.PI * a / n) * radius + 0.5) + y
      )
    );
  }
  return array;
}
