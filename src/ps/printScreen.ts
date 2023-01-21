import { mouse, screen, Region, Point } from '@nut-tree/nut-js';
import Jimp from 'jimp';

const getLeftTop = async () => {
  const currentPosition = await mouse.getPosition();
  const { x, y } = currentPosition;

  const screenSize = { width: await screen.width(), height: await screen.height() };

  let left = x - 100;
  let top = y - 100;

  if (left < 0) {
    left = 0;
  }

  if (top < 0) {
    top = 0;
  }

  if (x + 100 > screenSize.width) {
    left = screenSize.width - 200;
  }

  if (y + 100 > screenSize.height) {
    top = screenSize.height - 200;
  }

  return { left, top };
};

const getRegion = async () => {
  const { left, top } = await getLeftTop();
  return new Region(left, top, 200, 200);
}

export const psHandler = async () => {
  const selectedRegion = getRegion();
  const grabbedBGRimg = await screen.grabRegion(selectedRegion);
  await screen.highlight(selectedRegion);
  const RGBimg = await(grabbedBGRimg).toRGB();

  const jimp = new Jimp({ data: RGBimg.data, width: 200, height: 200 });

  const pngBuffer = await jimp.getBufferAsync(Jimp.MIME_PNG);
  return pngBuffer.toString('base64');
};
