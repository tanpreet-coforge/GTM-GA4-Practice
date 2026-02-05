import Script from 'next/script';

export const metadata = {
  title: 'GTM & GA4 Practice',
  description: 'A simple website to practice Google Tag Manager and Google Analytics implementation',
};

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-XXXXXXX';
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `,
          }}
        />
        
        {/* Initialize DataLayer */}
        <Script
          id="datalayer-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
            `,
          }}
        />
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        
        <nav style={styles.nav}>
          <a href="/" style={styles.navLink}>Home</a>
          <a href="/products" style={styles.navLink}>Products</a>
          <a href="/checkout" style={styles.navLink}>Checkout</a>
          <a href="/contact" style={styles.navLink}>Contact</a>
        </nav>

        <main style={styles.main}>
          {children}
        </main>

        <footer style={styles.footer}>
          <p>GTM & GA4 Practice Website</p>
        </footer>
      </body>
    </html>
  );
}

const styles = {
  nav: {
    backgroundColor: '#333',
    padding: '1rem',
    display: 'flex',
    gap: '2rem',
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '1rem',
    cursor: 'pointer',
  },
  main: {
    padding: '2rem',
    minHeight: 'calc(100vh - 150px)',
  },
  footer: {
    textAlign: 'center',
    padding: '1rem',
    borderTop: '1px solid #ddd',
    marginTop: '2rem',
  },
};
