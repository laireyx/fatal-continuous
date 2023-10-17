import { createContext, useContext } from 'react';

import Detector from './Detector';

const DetectorContext = createContext<Detector | null>(null);

export const DetectorProvider = DetectorContext.Provider;

export function useDetector() {
  const detect = useContext(DetectorContext);

  if (!detect)
    throw new Error('useDetector() failed: cannot retrieve detector instance');

  return detect;
}
