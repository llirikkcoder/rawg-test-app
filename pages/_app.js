import { ThemeProvider } from 'styled-components'
// import { useEffect } from 'react'
import GlobalStyle from '../components/globalstyles'
import Layout from '../components/Layout'
import { QueryClient, QueryClientProvider } from 'react-query'
import Navbar from '../components/Navbar'
import { useRouter } from 'next/router'
import { ReactQueryDevtools } from 'react-query/devtools'

const theme = {
    colors: {
        primary: '#111',
        secondary: '#0070f3',
    },
}

function MyApp({ Component, pageProps }) {
    const router = useRouter()
    const queryClient = new QueryClient()

    // useEffect(() => {
    //     const handleRouteChange = (url) => {
    //         if (process.env.NODE_ENV !== 'production') {
    //             const els = document.querySelectorAll(
    //                 'link[rel=stylesheet][data-n-p]'
    //             )
    //             const timestamp = new Date().valueOf()
    //             els.forEach((el) => {
    //                 if (el.href.indexOf('?ts=') === -1) {
    //                     el.href += `?ts=${timestamp}`
    //                 } else {
    //                     el.href = el.href.replace(/ts=\d+/, `ts=${timestamp}`)
    //                 }
    //             })
    //         }
    //     }
    //     router.events.on('routeChangeComplete', handleRouteChange)
    //     return () => {
    //         router.events.off('routeChangeComplete', handleRouteChange)
    //     }
    // }, [router.events])

    return (
        <>
            <GlobalStyle />
            <ThemeProvider theme={theme}>
                <QueryClientProvider client={queryClient}>
                    <Navbar />
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                    <ReactQueryDevtools />
                </QueryClientProvider>
            </ThemeProvider>
        </>
    )
}

export default MyApp
