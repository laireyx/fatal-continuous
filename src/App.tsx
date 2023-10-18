import { Suspense } from 'react';

import Controller from '@components/Controller';
import LoadingFallback from '@components/LoadingFallback';
import MemoDialog from '@components/MemoDialog';
import PipContent from '@components/PipContent';
import { ThemeContainer } from '@components/ThemeContainer';

function App() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ThemeContainer>
        <Controller />
        <MemoDialog />
        <PipContent />
      </ThemeContainer>
    </Suspense>
  );
}

export default App;
