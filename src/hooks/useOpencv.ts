import cv from '@techstark/opencv-js';

const pendingPromise = new Promise<void>((resolve) => {
  cv.onRuntimeInitialized = resolve;
});

export function useOpencvSuspense() {
  if (typeof cv.Mat !== 'function') throw pendingPromise;
}
