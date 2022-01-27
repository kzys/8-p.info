import Head from 'next/head'
interface layoutProps {
    meta,
    children
}

export default function Layout(props: layoutProps) {
    return <>
        <Head>
            <title>{props.meta.title}</title>
        </Head>
        {props.children}
    </>
}
