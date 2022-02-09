import '../global.css'
import Link from 'next/link'
import { Layout, Footer } from '../lib/layout'

export default function MyApp({ Component, pageProps }) {
    var c;
    try {
        // This one has props.
        c = Component(pageProps);
    } catch {
        // This one doesn't have props...
        c = <Component {...pageProps} />
    }

    let footer = c.props.footer == undefined

    return <Layout title={c.props.title || ''}>
        {c}
        {footer && <Footer />}
    </Layout>
}
