import { Suspense, lazy } from 'react';

import { ThemeContainer } from '@components/ThemeContainer';

const Controller = lazy(() => import('@components/Controller'));
const LoadingFallback = lazy(() => import('@components/LoadingFallback'));
const MemoDialog = lazy(() => import('@components/MemoDialog'));
const PipContent = lazy(() => import('@components/PipContent'));

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
