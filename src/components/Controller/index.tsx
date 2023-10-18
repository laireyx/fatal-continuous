import { useCallback } from 'react';

import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { faCamera } from '@fortawesome/free-solid-svg-icons/faCamera';
import { faWindowMaximize } from '@fortawesome/free-solid-svg-icons/faWindowMaximize';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useUi } from '@store/ui';
import { useDetector } from '@utils/detect/DetectProvider';
import pipElements from '@utils/PipElements';

import { buttonPanel, iconButton } from './index.css';

function Controller() {
  const { setMemoOpen } = useUi();

  const startDetect = useDetector();
  const openMemo = useCallback(() => setMemoOpen(true), [setMemoOpen]);
  const togglePip = useCallback(() => pipElements.togglePip(), []);

  return (
    <div className={`${buttonPanel}`}>
      <FontAwesomeIcon
        className={`${iconButton}`}
        icon={faCamera}
        onClick={startDetect}
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

export default Controller;
