import { useCallback, useEffect, useRef, useState } from 'react';

import { faClose } from '@fortawesome/free-solid-svg-icons/faClose';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons/faTrashAlt';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useUi } from '@store/ui';
import { useWalkthrough } from '@store/walkthrough';

import {
  icon,
  contentWrapper,
  floorDial,
  floorItem,
  memoDialog,
  memoEditor,
  floorItemSelected,
  memoArea,
  dialWrapper,
  iconWrapper,
} from './index.css';

export default function MemoDialog() {
  const { memoOpen, setMemoOpen } = useUi();
  const { floorMemo, setFloorMemo, save } = useWalkthrough();

  const [selectedFloor, setSelectedFloor] = useState(0);
  const [writing, setWriting] = useState('');

  const dialogRef = useRef<HTMLDialogElement>(null);
  const dialRef = useRef<HTMLDivElement>(null);

  const commitMemo = useCallback(() => {
    setFloorMemo(selectedFloor, writing.split('\n'));
    save();
  }, [setFloorMemo, save, selectedFloor, writing]);

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

  const refreshMemo = useCallback(() => {
    for (let i = 0; i <= 100; i++) {
      setFloorMemo(i, []);
    }
    save();
  }, [setFloorMemo, save]);

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
        <div className={`${iconWrapper}`}>
          <FontAwesomeIcon
            icon={faTrashAlt}
            className={`${icon}`}
            onClick={refreshMemo}
          />
          <FontAwesomeIcon
            icon={faClose}
            className={`${icon}`}
            onClick={closeMemo}
          />
        </div>
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
