import { useCallback, useEffect, useState } from 'react';

import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { faCamera } from '@fortawesome/free-solid-svg-icons/faCamera';
import { faWindowMaximize } from '@fortawesome/free-solid-svg-icons/faWindowMaximize';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useOpencv } from '@hooks/useOpencv';
import { useTemplate } from '@hooks/useTemplate';
import { setTimeout } from 'worker-timers';

import { useUi } from '@store/ui';
import { selectWalkthroughHooks, useWalkthrough } from '@store/walkthrough';
import { useDetector } from '@utils/detect/DetectProvider';
import pipElements from '@utils/PipElements';

import { buttonPanel, iconButton } from './index.css';

function togglePip() {
  if (document.pictureInPictureElement) {
    document.exitPictureInPicture();
  } else {
    pipElements.video.play();
    pipElements.video.requestPictureInPicture();
  }
}

function ButtonMenu() {
  const [isCapturing, setIsCapturing] = useState(false);

  const detector = useDetector();
  const { floorStart, floorEnd, continuousActivated, fatalStrikeActivated } =
    useWalkthrough(selectWalkthroughHooks);
  const { setMemoOpen } = useUi();

  useOpencv();
  useTemplate(detector);

  const startCapture = useCallback(async () => {
    if (!detector) return;

    await detector.startCapture();

    setIsCapturing(true);
  }, [detector, setIsCapturing]);

  const openMemo = useCallback(() => setMemoOpen(true), [setMemoOpen]);

  useEffect(() => {
    if (!isCapturing) return;

    let running = true;

    const handler = () => {
      const result = detector.detect();

      for (const { key, matchCount } of result) {
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

      if (running) setTimeout(handler, 250);
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

  return (
    <div className={`${buttonPanel}`}>
      <FontAwesomeIcon
        className={`${iconButton}`}
        icon={faCamera}
        onClick={startCapture}
      />
      <FontAwesomeIcon
        className={`${iconButton}`}
        icon={faFileAlt}
        onClick={openMemo}
      />
      <FontAwesomeIcon
        className={`${iconButton}`}
        icon={faWindowMaximize}
        onClick={togglePip}
      />
    </div>
  );
}

export default ButtonMenu;
