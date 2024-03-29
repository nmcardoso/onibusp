import '../styles/globals.scss'
import { QueryClient, QueryClientProvider } from 'react-query'
import Head from 'next/head'
import { APP_NAME, APP_DESCRIPTION, THEME_COLOR } from '../utils/constants'
import '../styles/bulma.scss'
import 'react-modern-drawer/dist/index.css'
import Script from 'next/script'
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

        <meta name="application-name" content={APP_NAME} />
        <meta name="description" content={APP_DESCRIPTION} />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content={THEME_COLOR} />
        <link rel="manifest" href="/manifest.json" />

        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />

        <meta name="msapplication-config" content="/icons/browserconfig.xml" />
        <meta name="msapplication-TileColor" content={THEME_COLOR} />
        <meta name="msapplication-tap-highlight" content="no" />

        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content={APP_NAME} />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/icons/apple-touch-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/icons/apple-touch-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/apple-touch-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon-180x180.png" />
        <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#5bbad5" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content="https://bususp.vercal.app" />
        <meta name="twitter:title" content={APP_NAME} />
        <meta name="twitter:description" content={APP_NAME} />
        <meta name="twitter:image" content="https://bususp.vercal.app/icons/android-chrome-192x192.png" />
        {/* <meta name="twitter:creator" content="@DavidWShadow" /> */}

        <meta property="og:type" content="website" />
        <meta property="og:title" content={APP_NAME} />
        <meta property="og:description" content={APP_DESCRIPTION} />
        <meta property="og:site_name" content={APP_NAME} />
        <meta property="og:url" content="https://bususp.vercal.app" />
        <meta property="og:image" content="https://bususp.vercal.app/icons/apple-touch-icon.png" />

        <link rel="prefetch" href="https://b.tile.openstreetmap.org/" />
        <link rel="preconnect" href="https://b.tile.openstreetmap.org/" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
      </Head>

      {process.env.NODE_ENV === 'production' &&
        <>
          <Script
            strategy="afterInteractive"
            src="https://www.googletagmanager.com/gtag/js?id=G-CXQC4VY3GC" />
          <Script
            id="gtag-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());
                      gtag('config', 'G-CXQC4VY3GC');`
            }} />
        </>
      }
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </>
  )
}

export default MyApp
