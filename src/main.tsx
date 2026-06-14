import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { theme } from './theme';
import './index.css';
import App from './App.tsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* ThemeProvider makes `theme` available to every styled-component */}
    <ThemeProvider theme={theme}>
      {/* QueryClientProvider wires TanStack Query into the component tree */}
      <QueryClientProvider client={queryClient}>
        <App />
        {/* Devtools panel in the bottom-right corner (dev only) */}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>
);
