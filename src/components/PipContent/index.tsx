import { useEffect, useRef } from 'react';

import html2canvas from 'html2canvas';
import { setTimeout } from 'worker-timers';

import CooldownIndicator from '@components/CooldownIndicator';
import { useWalkthrough } from '@store/walkthrough';
import pipElements from '@utils/PipElements';

import {
  container,
  memoBox,
  header,
  memoItem,
  cooldownBox,
  boxHeader,
} from './index.css';
import continuousIcon from '../../assets/continuous.png';
import fatalStrikeIcon from '../../assets/fatal-strike.png';

import { themeClass } from '@theme';

async function refreshPip(ref: React.RefObject<HTMLElement>) {
  if (ref.current) {
    const canvas = new OffscreenCanvas(
      ref.current.scrollWidth - 2,
      ref.current.scrollHeight - 2,
    );

    await html2canvas(ref.current, {
      x: 4,
      y: 4,
      ignoreElements: (element) => element.tagName.toLowerCase() === 'dialog',
      canvas: canvas as unknown as HTMLCanvasElement,
      scale: 1,
      logging: false,
    });

    pipElements.update(canvas);
  }

  setTimeout(() => refreshPip(ref), 42);
}

export default function PipContent() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { floor, floorMemo, continuous, fatalStrike } = useWalkthrough(
    ({ floor, floorMemo, continuous, fatalStrike }) => ({
      floor,
      floorMemo,
      continuous,
      fatalStrike,
    }),
  );

  useEffect(() => {
    refreshPip(containerRef);
  }, []);

  return (
    <>
      <div className={`${themeClass} ${container}`} ref={containerRef}>
        <h1 className={`${header}`}>{floor}층</h1>
        <div className={`${cooldownBox}`}>
          <CooldownIndicator
            iconUrl={fatalStrikeIcon}
            lastActivated={fatalStrike}
            cooldown={30}
          />
          <CooldownIndicator
            iconUrl={continuousIcon}
            lastActivated={continuous}
            cooldown={12}
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
