import { QueryClient, QueryClientProvider } from 'react-query'
import '../styles/globals.css';
import {ReactQueryDevtools} from 'react-query/devtools';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        }
    }
});

function MyApp({ Component, pageProps }) {
    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools/>
            <Component {...pageProps} />
        </QueryClientProvider>
    )
}

export default MyApp
