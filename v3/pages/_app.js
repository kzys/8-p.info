import '../global.css'
import Link from 'next/link'
import Layout from '../lib/layout'

export default function MyApp({ Component, pageProps }) {
    var c;
    try {
        // This one has props.
        c = Component(pageProps);
    } catch {
        // This one doesn't have props...
        c = <Component {...pageProps} />
    }
    return <Layout title={c.props.title || ''}>
        {c}
        <footer style={{ borderTop: '1px solid #000', paddingTop: '1rem' }}>
            <Link href="/">8-p.info</Link>
        </footer>
    </Layout>
}
