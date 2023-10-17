import type cv from '@techstark/opencv-js';

declare module '@techstark/opencv-js' {
  function minMaxLoc(src: cv.Mat): cv.MinMaxLoc;
  interface Mat {
    delete(): void;
  }
}
