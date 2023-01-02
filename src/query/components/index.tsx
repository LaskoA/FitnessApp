import { ReactNode } from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// import { getInitialQueryClient } from '../utils';

export const queryClient = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retryOnMount: false,
      retry: false,
    },
  },
};

export const getInitialQueryClient = () => new QueryClient(queryClient);

const client = getInitialQueryClient();

export interface QueryProviderProps {
  readonly children: ReactNode;
}

export const QueryProvider = ({ children }: QueryProviderProps) => (
  <QueryClientProvider client={client}>
    {children}
    <ReactQueryDevtools />
  </QueryClientProvider>
);
