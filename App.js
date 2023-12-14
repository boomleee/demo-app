import {  View } from 'react-native';
import HomeScreen from './src/components/homeScreen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HomeScreen/>
    </QueryClientProvider>
      
  );
}


