import Detector, { RoiCallback } from '@utils/detect/Detector';

import continous from '../assets/continuous.png';
import fatalStrike from '../assets/fatal-strike.png';
import floorEnd from '../assets/floor-end.png';
import floorStart from '../assets/floor-start.png';

const TemplateImages: Record<string, { url: string; roi: RoiCallback }> = {
  continuous: {
    url: continous,
    roi: (size) => [size.width / 2, 0, size.width / 2, 32 * 5],
  },
  fatalStrike: {
    url: fatalStrike,
    roi: (size) => [size.width / 2, 0, size.width / 2, 32 * 5],
  },

  floorStart: {
    url: floorStart,
    roi: (size) => [size.width / 2 - 400, 32, 800, 75],
  },
  floorEnd: {
    url: floorEnd,
    roi: (size) => [size.width / 2 - 400, 32, 800, 75],
  },
};

let loadFinished = false;
let pendingPromise: Promise<void> | null = null;

export function useTemplate(detector: Detector) {
  if (!pendingPromise) {
    pendingPromise = Promise.all(
      Object.entries(TemplateImages).map(([key, { url, roi }]) =>
        detector.loadTemplateMatrix(key, url, roi),
      ),
    ).then(() => {
      loadFinished = true;
    });
  }

  if (!loadFinished) throw pendingPromise;
}
