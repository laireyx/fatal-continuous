import React from 'react';
import ReactDOM from 'react-dom/client';

import Detector from '@utils/detect/Detector.ts';
import { DetectorProvider } from '@utils/detect/DetectProvider.ts';

import App from './App.tsx';
import './index.css';

const detector = new Detector();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DetectorProvider value={detector}>
      <App />
    </DetectorProvider>
  </React.StrictMode>,
);
