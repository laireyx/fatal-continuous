import cv from '@techstark/opencv-js';

import Capture from './Capture';

export type RoiCallback = (
  src: cv.Size,
) => ConstructorParameters<typeof cv.Rect>;

type DetectTemplate = {
  template: cv.Mat;
  roi: RoiCallback;
};

type DetectedItem = {
  key: string;
  matchCount: number;
};

type DetectResult = DetectedItem[];

export default class Detector {
  private templates: Map<string, DetectTemplate> = new Map();

  capture = new Capture();
  threshold = 0.75;

  startCapture() {
    return this.capture.initialize();
  }

  async loadTemplateMatrix(key: string, url: string, roi: RoiCallback) {
    function loadImage(url: string) {
      const img = new Image();

      img.style.display = 'none';

      return new Promise<cv.Mat>((resolve, reject) => {
        img.addEventListener('load', () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;

          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0);
          resolve(cv.imread(canvas));
          img.remove();
        });

        img.addEventListener('error', (err) => {
          reject(err);
          img.remove();
        });

        img.src = url;
        document.body.appendChild(img);
      });
    }

    this.templates.set(key, {
      template: await loadImage(url),
      roi,
    });
  }

  detect(): DetectResult {
    const shot = this.capture.takeCapture();

    const detectResult: DetectResult = [];
    let src: cv.Mat | null = null;

    let prevRoiRect: cv.Rect = new cv.Rect();

    for (const [key, { template, roi }] of this.templates.entries()) {
      const roiRect = new cv.Rect(
        ...(roi(shot.size()) ?? [0, 0, shot.cols, shot.rows]),
      );

      if (
        !(
          src &&
          prevRoiRect.x === roiRect.x &&
          prevRoiRect.y === roiRect.y &&
          prevRoiRect.width === roiRect.width &&
          prevRoiRect.height === roiRect.height
        )
      ) {
        src?.delete();
        src = shot.roi(roiRect);
        prevRoiRect = roiRect;
      }

      const result = new cv.Mat();

      cv.matchTemplate(src, template, result, cv.TM_CCOEFF_NORMED);

      const dst = new cv.Mat();
      cv.threshold(result, dst, this.threshold, 0, cv.THRESH_TOZERO);

      let matchCount = 0;

      let { maxVal, maxLoc } = cv.minMaxLoc(dst);

      while (maxVal > this.threshold) {
        dst.floatPtr(maxLoc.y, maxLoc.x)[0] = 0;
        matchCount++;
        ({ maxVal, maxLoc } = cv.minMaxLoc(dst));
      }

      if (matchCount > 0)
        detectResult.push({
          key,
          matchCount,
        });

      dst.delete();
      result.delete();
    }

    src?.delete();

    return detectResult;
  }
}
