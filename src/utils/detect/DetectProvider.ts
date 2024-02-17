import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { useOpencvSuspense } from '@hooks/useOpencv';
import { useTemplate } from '@hooks/useTemplate';

import { useWalkthrough } from '@store/walkthrough';
import runtimeParams from '@utils/runtimeParams';

import Detector from './Detector';

const DetectorContext = createContext<Detector | null>(null);

export const DetectorProvider = DetectorContext.Provider;

export function useDetector() {
  const detector = useContext(DetectorContext);
  const [isCapturing, setIsCapturing] = useState(false);

  if (!detector)
    throw new Error('useDetector() failed: cannot retrieve detector instance');

  const { floorStart, floorEnd, continuousActivated, fatalStrikeActivated } =
    useWalkthrough();

  const startDetect = useCallback(async () => {
    if (!detector) return;

    await detector.startCapture();

    setIsCapturing(true);
  }, [detector, setIsCapturing]);

  useOpencvSuspense();
  useTemplate(detector);

  // Use double-checking because of `React.StrictMode`
  useEffect(() => {
    if (!isCapturing) return;

    let running = true;

    const handler = () => {
      const result = detector.detect();

      if (result) {
        const { key, matchCount } = result;

        switch (key) {
          case 'floorStart':
            floorStart();
            break;
          case 'floorEnd':
            floorEnd();
            break;
          case 'continuous':
            if (matchCount === 2) continuousActivated();
            break;
          case 'fatalStrike':
            fatalStrikeActivated();
            break;
        }
      }

      if (running) setTimeout(handler, runtimeParams.CAPTURE_FPS);
    };

    handler();

    return () => {
      running = false;
    };
  }, [
    detector,
    isCapturing,
    floorStart,
    floorEnd,
    continuousActivated,
    fatalStrikeActivated,
  ]);

  return startDetect;
}
