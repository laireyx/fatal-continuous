import { useEffect, useState } from 'react';

import { setTimeout } from 'worker-timers';

import { cooldownText, indicator } from './index.css';
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

  useEffect(() => {
    // Force re-render cooldown icon
    setTimeout(() => setNow(Date.now()), 100);
  }, [now]);

  return (
    <div className={`${indicator}`}>
      <img src={iconUrl} />
      <span className={`${cooldownText}`}>
        {Math.max(
          Math.floor((lastActivated + cooldown * 1000 - now) / 1000),
          0,
        )}
        s
      </span>
    </div>
  );
}
