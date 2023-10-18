import Detector, { RoiCallback } from '@utils/detect/Detector';

import continous from '../assets/continuous.png';
import fatalStrike from '../assets/fatal-strike.png';
import floorEnd from '../assets/floor-end.png';
import floorStart from '../assets/floor-start.png';

const TemplateImages: Record<
  string,
  { url: string; roi: RoiCallback; detectAll: boolean }
> = {
  continuous: {
    url: continous,
    roi: (size) => [size.width / 2, 96, size.width / 2, 32 * 5],
    detectAll: true,
  },
  fatalStrike: {
    url: fatalStrike,
    roi: (size) => [size.width / 2, 96, size.width / 2, 32 * 5],
    detectAll: false,
  },

  // 680px: Full floor indicator size (center-aligned)
  // 587px: HP bar size
  // 80px : HP bar offset (inside the indicator)

  // Floor indicator layout(center-aligned)
  //
  // 0          80                80+587   680
  // [          [======HPBAR======]        ]
  floorStart: {
    url: floorStart,
    roi: (size) => [size.width / 2 - 340 + 80, 40, 24 + 587, 32],
    detectAll: false,
  },
  floorEnd: {
    url: floorEnd,
    roi: (size) => [size.width / 2 - 340 + 80, 40, 24 + 587, 32],
    detectAll: false,
  },
};

let loadFinished = false;
let pendingPromise: Promise<void> | null = null;

export function useTemplate(detector: Detector) {
  if (!pendingPromise) {
    pendingPromise = Promise.all(
      Object.entries(TemplateImages).map(([key, { url, roi, detectAll }]) =>
        detector.loadTemplateMatrix(key, url, roi, detectAll),
      ),
    ).then(() => {
      loadFinished = true;
    });
  }

  if (!loadFinished) throw pendingPromise;
}
