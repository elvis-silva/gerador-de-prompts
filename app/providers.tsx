'use client';

import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/app/theme';

const cache = createCache({
  key: 'css',
  prepend: true,
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme} >
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}
