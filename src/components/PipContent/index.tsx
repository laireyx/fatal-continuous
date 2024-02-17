import { useEffect, useRef } from 'react';

import html2canvas from 'html2canvas';
import { setTimeout } from 'worker-timers';

import CooldownIndicator from '@components/CooldownIndicator';
import { useWalkthrough } from '@store/walkthrough';
import pipElements from '@utils/PipElements';
import runtimeParams from '@utils/runtimeParams';

import {
  container,
  memoBox,
  header,
  memoItem,
  cooldownBox,
  boxHeader,
  cooldownBoxBlink,
} from './index.css';
import continuousIcon from '../../assets/continuous.png';
import fatalStrikeIcon from '../../assets/fatal-strike.png';

async function refreshPip(ref: React.RefObject<HTMLElement>) {
  if (ref.current) {
    const canvas = new OffscreenCanvas(
      ref.current.scrollWidth - 2,
      ref.current.scrollHeight - 2,
    );

    await html2canvas(ref.current, {
      x: 4,
      y: 4,
      canvas: canvas as unknown as HTMLCanvasElement,
      scale: 1,
      logging: false,
    });

    pipElements.update(canvas);
  }

  setTimeout(() => refreshPip(ref), runtimeParams.VIEW_FPS);
}

export default function PipContent() {
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    floor,
    floorMemo,
    killCount,
    nextContinuous,
    nextFatalStrike,
    isSynchronized,
  } = useWalkthrough();

  useEffect(() => {
    refreshPip(containerRef);
  }, []);

  return (
    <>
      <div className={`${container}`} ref={containerRef}>
        <h1 className={`${header}`}>
          {floor}
          {31 <= floor && floor < 40 && ` - ${killCount + 1}`}층
        </h1>
        <div
          className={`${cooldownBox} ${
            isSynchronized() ? cooldownBoxBlink : ''
          }`}
        >
          <CooldownIndicator
            iconUrl={fatalStrikeIcon}
            cooldownFn={nextFatalStrike}
          />
          <CooldownIndicator
            iconUrl={continuousIcon}
            cooldownFn={nextContinuous}
          />
        </div>
        <div className={`${memoBox}`}>
          <span className={`${boxHeader}`}>이번 층 메모</span>
          <p>
            {(floorMemo[floor] ?? []).map((memo, idx) => (
              <span key={idx} className={`${memoItem}`}>
                {memo}
              </span>
            ))}
          </p>
        </div>
      </div>
    </>
  );
}
