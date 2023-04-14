import { ThemeProvider } from 'styled-components'
import GlobalStyle from '../components/globalstyles'
import Layout from '../components/Layout'
import { QueryClient, QueryClientProvider } from 'react-query'
import Navbar from '../components/Navbar'
import { useRouter } from 'next/router'
// import { ReactQueryDevtools } from 'react-query/devtools'

const theme = {
    colors: {
        primary: '#111',
        secondary: '#0070f3',
    },
}

function MyApp({ Component, pageProps }) {
    const router = useRouter()
    const queryClient = new QueryClient()

    return (
        <>
            <GlobalStyle />
            <ThemeProvider theme={theme}>
                <QueryClientProvider client={queryClient}>
                    <Navbar />
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                    {/* <ReactQueryDevtools /> */}
                </QueryClientProvider>
            </ThemeProvider>
        </>
    )
}

export default MyApp
