import localforage from 'localforage';
import { create } from 'zustand';

type PlayState = 'start' | 'attacking' | 'end';
type ContinuousState = 2 | 1 | 0;

interface WalkthroughStore {
  floor: number;
  killCount: number;
  state: PlayState;

  continuous: number;
  continuousState: ContinuousState;

  fatalStrike: number;

  floorMemo: string[][];

  save: () => void;
  setFloorMemo: (floor: number, memo: string[]) => void;

  floorStart: () => void;
  floorEnd: () => void;

  continuousActivated: () => void;
  fatalStrikeActivated: () => void;

  nextContinuous: () => number;
  nextFatalStrike: () => number;

  isSynchronized: () => boolean;
}

function calculateCooldown(lastActivated: number, cooldown: number) {
  return Math.max(lastActivated + cooldown * 1000 - Date.now(), 0);
}

const useWalkthrough = create<WalkthroughStore>((set, get) => ({
  floor: 0,
  killCount: 0,
  state: 'end',

  continuous: -1,
  continuousState: 0,

  fatalStrike: -1,

  floorMemo: new Array(101).fill(0).map(() => []),

  save: () => {
    const { floorMemo } = get();
    localforage.setItem('walkthrough', floorMemo);
  },

  setFloorMemo: (floor: number, memo: string[]) => {
    const { floorMemo: oldMemo } = get();
    const floorMemo = oldMemo.slice();

    floorMemo[floor] = memo;

    set({ floorMemo });
  },

  floorStart: () =>
    set(({ state, floor, killCount }) => {
      // Alreay Started
      if (state === 'end') {
        let mobCount = 1;

        // There could be multiple mobs in a single floor!
        if (31 <= floor && floor < 38) {
          mobCount = 2;
        } else if (38 <= floor && floor < 40) {
          mobCount = 3;
        }

        killCount++;

        if (killCount === mobCount) {
          return { state: 'start', floor: floor + 1, killCount: 0 };
        } else {
          return { state: 'start', killCount };
        }
      }

      return { state: 'attacking' };
    }),
  floorEnd: () => set({ state: 'end' }),

  continuousActivated: () => {
    const { continuous } = get();

    // Continuous Ring is not affected by Server delay
    // Anyway we need some room for capturing & processing delay
    if (Date.now() - continuous > 10 * 1000) {
      set({ continuous: Date.now() });
    }
  },

  fatalStrikeActivated: () => {
    const { fatalStrike } = get();

    if (Date.now() - fatalStrike > 25 * 1000) {
      set({ fatalStrike: Date.now() });
    }
  },

  nextContinuous: () => {
    const { continuous } = get();
    return calculateCooldown(continuous, 12);
  },

  nextFatalStrike: () => {
    const { fatalStrike } = get();
    return calculateCooldown(fatalStrike, 30);
  },

  isSynchronized: () => {
    const { nextContinuous, nextFatalStrike } = get();

    return (
      nextFatalStrike() <= nextContinuous() &&
      nextContinuous() < nextFatalStrike() + 3000
    );
  },
}));

(async function () {
  const floorMemo =
    await localforage.getItem<WalkthroughStore['floorMemo']>('walkthrough');

  if (floorMemo) useWalkthrough.setState({ floorMemo });
})();

export { useWalkthrough };
