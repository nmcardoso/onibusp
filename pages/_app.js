import '../styles/globals.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import Head from 'next/head'
// import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient()


function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover'
        />
      </Head>

      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </>
  )
}

export default MyApp
