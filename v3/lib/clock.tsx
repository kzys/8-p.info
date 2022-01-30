import { DateTime } from 'luxon';
import { useState, useEffect } from 'react';

function hourHandAngle(dt) {
    return dt.minute * 6
}
function minuteHandAngle(dt) {
    return ((dt.hour % 12) * 30) + (dt.minute / 2)
}

interface clockProps {
    timeZone: string
    name?: string
}

export default function Clock(props: clockProps) {
    const [dateTime, setDateTime] = useState(DateTime.fromMillis(0))
    const name = props?.name || props.timeZone.split(/\//)[1];

    const update = () => {
        let dt = DateTime.now();
        dt = dt.setZone(props.timeZone)
        setDateTime(dt);
    }

    useEffect(() => {
        let x = setInterval(update, 1000)
        update();
        return () => clearInterval(x);
    }, [])

    let face = "#fff"
    let hand = "#ccc"

    if (9 <= dateTime.hour && dateTime.hour <= 17) {
        hand = 'black'
    } else if (17 < dateTime.hour || dateTime.hour < 6) {
        hand = '#fff'
        face = '#000'
    }

    return <div style={{ textAlign: 'center', width: '5rem', margin: '0' }}>
        <div>{name}</div>
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="45" fill={face} stroke={hand} strokeWidth="2" />
            <line x1="50" y1="50" x2="50" y2="20" stroke={hand} strokeWidth="2"
                transform={`rotate(${minuteHandAngle(dateTime)}  50 50)`} />
            <line x1="50" y1="50" x2="50" y2="10" stroke={hand} strokeWidth="2"
                transform={`rotate(${hourHandAngle(dateTime)}  50 50)`} />
        </svg>
        <div style={{ fontSize: '0.8rem' }}>{dateTime.toFormat("DD")}<br />{dateTime.toFormat("t")}</div>
    </div>
}