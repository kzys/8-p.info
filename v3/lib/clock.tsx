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

    return <div style={{ textAlign: 'center', width: '5rem', margin: '1rem' }}>
        <div>{name}</div>
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="45" fill="none" stroke="black" strokeWidth="2" />
            <line x1="50" y1="50" x2="50" y2="20" stroke="black" strokeWidth="2"
                transform={`rotate(${minuteHandAngle(dateTime)}  50 50)`} />
            <line x1="50" y1="50" x2="50" y2="10" stroke="black" strokeWidth="2"
                transform={`rotate(${hourHandAngle(dateTime)}  50 50)`} />
        </svg>
        <div style={{ fontSize: '0.9rem' }}>{dateTime.toFormat("DD")}<br />{dateTime.toFormat("t")}</div>
    </div>
}