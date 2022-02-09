import Head from 'next/head'
import Link from 'next/link'

import styles from './layout.module.css'
interface layoutProps {
    title?,
    children
}


export function Footer() {
    return <>
        <footer className={styles.footer}>
            <Link href="/">Back to 8-p.info</Link>
        </footer>
    </>
}


export function Layout(props: layoutProps) {
    return <>
        <Head>
            <title>{props.title}</title>
        </Head>
        {props.children}
    </>
}
