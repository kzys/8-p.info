import '../global.css'
import Layout from '../lib/layout'

export default function MyApp({ Component, pageProps }) {
    let c = Component(pageProps)
    return <Layout title={c.props.title}>{c}</Layout>
}
