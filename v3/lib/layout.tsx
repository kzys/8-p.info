import Head from 'next/head'
interface layoutProps {
    title?,
    children
}

export default function Layout(props: layoutProps) {
    return <>
        <Head>
            <title>{props.title}</title>
        </Head>
        {props.children}
    </>
}
