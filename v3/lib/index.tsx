import Head from 'next/head'
import Link from 'next/link'
import Clock from './clock'

export default function Index() {
    return <div style={{ display: 'flex' }}>
        <Clock timeZone="America/Los_Angeles" name="Seattle" />
        <Clock timeZone="Europe/Bucharest" />
        <Clock timeZone="Asia/Tokyo" />
    </div>
}
