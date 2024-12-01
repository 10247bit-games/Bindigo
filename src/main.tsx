import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from './lib/queryClient';
import { ErrorBoundary } from './components/errors';
import { setupErrorHandlers } from './lib/errors';
import App from './App';
import './index.css';

const isDev = import.meta.env.VITE_ENV === 'development';
const isTest = import.meta.env.VITE_ENV === 'test';

// Initialize error handlers before rendering
setupErrorHandlers();

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');

createRoot(rootElement).render(
  <StrictMode>
    <ErrorBoundary 
      onReset={() => {
        queryClient.clear();
        window.location.reload();
      }}
    >
      <QueryClientProvider client={queryClient}>
        <App />
        {(isDev || isTest) && <ReactQueryDevtools initialIsOpen={false} />}
      </QueryClientProvider>
    </ErrorBoundary>
  </StrictMode>
);