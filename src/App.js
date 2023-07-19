import Home from './pages/Home';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import AppRouter from './router/router';
const queryClient = new QueryClient()
function App() {
  return (
    <div className='hello'>
    <QueryClientProvider client={queryClient}>
      <AppRouter />
    </QueryClientProvider>
    </div>
  );
}

export default App;
