import { useCallback, useEffect, useRef, useState } from 'react';

import { faClose } from '@fortawesome/free-solid-svg-icons/faClose';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useUi } from '@store/ui';
import { useWalkthrough } from '@store/walkthrough';

import {
  closeBtn,
  contentWrapper,
  floorDial,
  floorItem,
  memoDialog,
  memoEditor,
  floorItemSelected,
  memoArea,
  dialWrapper,
} from './index.css';

export default function MemoDialog() {
  const { memoOpen, setMemoOpen } = useUi();
  const { floorMemo, setFloorMemo } = useWalkthrough();

  const [selectedFloor, setSelectedFloor] = useState(0);
  const [writing, setWriting] = useState('');

  const dialogRef = useRef<HTMLDialogElement>(null);
  const dialRef = useRef<HTMLDivElement>(null);

  const commitMemo = useCallback(
    () => setFloorMemo(selectedFloor, writing.split('\n')),
    [setFloorMemo, selectedFloor, writing],
  );

  const changeFloor = useCallback(
    (toFloor: number) => {
      commitMemo();
      setSelectedFloor(toFloor);

      dialRef.current?.scrollTo({
        left: 0,
        top: 48 * toFloor,
        behavior: 'smooth',
      });
    },
    [commitMemo, setSelectedFloor],
  );

  const closeMemo = useCallback(() => {
    commitMemo();
    setMemoOpen(false);
  }, [commitMemo, setMemoOpen]);

  useEffect(
    () => setWriting(floorMemo[selectedFloor].join('\n')),
    [selectedFloor, floorMemo],
  );

  useEffect(() => {
    if (memoOpen === true) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [memoOpen]);

  return (
    <dialog
      className={`${memoDialog}`}
      ref={dialogRef}
      onClose={() => setMemoOpen(false)}
    >
      <div className={`${contentWrapper}`}>
        <FontAwesomeIcon
          icon={faClose}
          className={`${closeBtn}`}
          onClick={closeMemo}
        />
        <div className={`${memoEditor}`}>
          <div className={`${dialWrapper}`}>
            <div className={`${floorDial}`} ref={dialRef}>
              {floorMemo.map((_, floor) => (
                <div
                  className={`${floorItem} ${
                    floor === selectedFloor ? floorItemSelected : ''
                  }`}
                  key={floor}
                  onClick={() => changeFloor(floor)}
                >
                  <span>{floor}층</span>
                </div>
              ))}
            </div>
          </div>
          <textarea
            id={'none'}
            className={`${memoArea}`}
            value={writing}
            onChange={({ target: { value } }) => setWriting(value)}
          />
        </div>
      </div>
    </dialog>
  );
}
