// use cjs require so it always returns a callable function
// eslint-disable-next-line @typescript-eslint/no-var-requires
const sharp: typeof import('sharp') = require('sharp');

export type OptimizationConfig = {
  format?: 'webp' | 'png' | 'jpeg';
  height?: number;
  width?: number;
};

export const optimizeImage = async (
  file: Buffer,
  config: OptimizationConfig = {},
): Promise<Buffer> => {
  const { format = 'webp', height, width } = config;

  let sp = sharp(file).rotate();

  if (height || width) {
    sp = sp.resize({ width, height, fit: 'inside', withoutEnlargement: true });
  }

  if (format === 'webp') sp = sp.webp({ quality: 80 });
  else if (format === 'jpeg') sp = sp.jpeg({ quality: 80, mozjpeg: true });
  else sp = sp.png({ compressionLevel: 9 });

  return sp.toBuffer();
};
