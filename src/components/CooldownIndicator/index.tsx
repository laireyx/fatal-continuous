import { useEffect, useState } from 'react';

import { setTimeout } from 'worker-timers';

import { cooldownText, cooldownTextImminent, indicator } from './index.css';
type CooldownIndicatorProps = {
  iconUrl: string;
  cooldownFn: () => number;
};

export default function CooldownIndicator({
  iconUrl,
  cooldownFn,
}: CooldownIndicatorProps) {
  const [now, setNow] = useState(Date.now());

  const cooldownMs = cooldownFn();
  const cooldownSec = Math.floor(cooldownMs / 1000);

  useEffect(() => {
    // Force re-rendering this element
    setTimeout(() => setNow(Date.now()), 100);
  }, [now]);

  return (
    <div className={`${indicator}`}>
      <img src={iconUrl} />
      <span
        className={`${cooldownText} ${
          0 < cooldownMs && cooldownMs < 3000 ? cooldownTextImminent : ''
        }`}
      >
        {cooldownSec}s
      </span>
    </div>
  );
}
