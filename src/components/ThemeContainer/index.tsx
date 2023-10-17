import { menu } from './index.css';

import { themeClass } from '@theme';

export function ThemeContainer({ children }: React.PropsWithChildren) {
  return <div className={`${themeClass} ${menu}`}>{children}</div>;
}
