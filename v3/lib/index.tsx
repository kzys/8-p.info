import Head from 'next/head'
import Link from 'next/link'
import Clock from './clock'

export default function Index() {
    let s = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
    return <div style={s}>
        <h1>8-p.info</h1>
        <Clock timeZone="America/Los_Angeles" name="Seattle" />
        <Clock timeZone="Europe/Bucharest" />
        <Clock timeZone="Asia/Tokyo" />
    </div>
}
