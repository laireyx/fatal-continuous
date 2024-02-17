import cv from '@techstark/opencv-js';

import Capture from './Capture';

export type RoiCallback = (
  src: cv.Size,
) => ConstructorParameters<typeof cv.Rect>;

type DetectTemplate = {
  template: cv.Mat;
  roi: RoiCallback;
  detectAll: boolean;
};

type DetectResult = {
  key: string;
  matchCount: number;
};

export default class Detector {
  private templates: Map<string, DetectTemplate> = new Map();

  capture = new Capture();
  threshold = 0.7;

  startCapture() {
    return this.capture.initialize();
  }

  async loadTemplateMatrix(
    key: string,
    url: string,
    roi: RoiCallback,
    detectAll: boolean,
  ) {
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
      detectAll,
    });
  }

  detect(): DetectResult | null {
    const shot = this.capture.takeCapture();

    let detectResult: DetectResult | null = null;
    let src: cv.Mat | null = null;

    let prevRoiRect: cv.Rect = new cv.Rect();

    for (const [
      key,
      { template, roi, detectAll },
    ] of this.templates.entries()) {
      const roiRect = new cv.Rect(
        ...(roi(shot.size()) ?? [0, 0, shot.cols, shot.rows]),
      );

      // Check if a ROI is same as the last detection.
      // If so, reuse `src` sub-matrix. If not, recreate it.
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

      let matchCount = 0;

      let { maxVal, maxLoc } = cv.minMaxLoc(result);

      while (maxVal > this.threshold) {
        result.floatPtr(maxLoc.y, maxLoc.x)[0] = 0;
        matchCount++;

        if (!detectAll) break;
        ({ maxVal, maxLoc } = cv.minMaxLoc(result));
      }

      if (matchCount > 0)
        detectResult = {
          key,
          matchCount,
        };

      result.delete();
    }

    src?.delete();

    return detectResult;
  }
}
