import { useEffect, useState } from 'react';

import { setTimeout } from 'worker-timers';

import { cooldownText, cooldownTextImminent, indicator } from './index.css';
type CooldownIndicatorProps = {
  iconUrl: string;
  lastActivated: number;
  cooldown: number;
};

export default function CooldownIndicator({
  iconUrl,
  lastActivated,
  cooldown,
}: CooldownIndicatorProps) {
  const [now, setNow] = useState(Date.now());
  const cooldownMs = Math.max(lastActivated + cooldown * 1000 - now, 0);
  const cooldownSec = Math.floor(cooldownMs / 1000);

  useEffect(() => {
    // Force re-render cooldown icon
    setTimeout(() => setNow(Date.now()), 100);
  }, [now]);

  return (
    <div className={`${indicator}`}>
      <img src={iconUrl} />
      <span
        className={`${cooldownText} ${
          0 < cooldownMs && cooldownMs < 3 ? cooldownTextImminent : ''
        }`}
      >
        {cooldownSec}s
      </span>
    </div>
  );
}
