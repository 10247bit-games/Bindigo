import { QueryClient } from '@tanstack/react-query';
import { QUERY_CONFIG } from './api/config';

export const queryClient = new QueryClient(QUERY_CONFIG);