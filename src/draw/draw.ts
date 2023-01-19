import { mouse, Point } from '@nut-tree/nut-js';

export const drawHandler = async (command: string, arg1: number, arg2?: number) => {
  switch (command) {
    case 'draw_circle':
      const { x: centerX, y: centerY } = await mouse.getPosition();
      const pArr = getPointsArray(centerX, centerY, arg1);
      const startPoint = pArr.shift()
      mouse.config.mouseSpeed = 200;
      await mouse.move([startPoint as Point]);
      arg1 && (await mouse.drag(pArr));
      break;


    default:
      break;
  }
};

const getPointsArray = (xCtr: number, yCtr: number, radius: number ) => {
  const array = [];
  const n = 360;
  for (let a = 0; a <= n ; a++) {
    array.push(
      new Point(
        (Math.cos(2 * Math.PI * a / n) * radius + 0.5) + xCtr,
        (Math.sin(2 * Math.PI * a / n) * radius + 0.5) + yCtr
      )
    );
  }
  return array;
}
