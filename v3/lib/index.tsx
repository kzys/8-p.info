import Head from 'next/head'
import Link from 'next/link'
import Clock from './clock'

export default function Index() {
    return <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1>8-p.info</h1>
        <Clock timeZone="America/Los_Angeles" name="Seattle" />
        <Clock timeZone="Europe/Bucharest" />
        <Clock timeZone="Asia/Tokyo" />
    </div>
}
