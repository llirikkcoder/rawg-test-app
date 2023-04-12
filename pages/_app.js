import { ThemeProvider } from 'styled-components'
import GlobalStyle from '../components/globalstyles'
import Layout from '../components/Layout'
import { QueryClient, QueryClientProvider } from 'react-query'

const theme = {
    colors: {
        primary: '#111',
        secondary: '#0070f3',
    },
}

function MyApp({ Component, pageProps }) {
    const queryClient = new QueryClient()

    return (
        <>
            <ThemeProvider theme={theme}>
                <GlobalStyle />
                <QueryClientProvider client={queryClient}>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </QueryClientProvider>
            </ThemeProvider>
        </>
    )
}

export default MyApp
