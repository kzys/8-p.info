<script>
import { onDestroy } from 'svelte';
import { DateTime } from 'luxon';

let clocks = []

function hourHandAngle(dt) {
    return dt.minute * 6
}
function minuteHandAngle(dt) {
    return ((dt.hour % 12) * 30) + (dt.minute / 2)
}

function updateClocks() {
    let dt = DateTime.local()
    
    clocks = [
        { tz: 'America/Los_Angeles', name: 'Seattle' },
        { tz: 'Europe/Bucharest' },
        { tz: 'Asia/Tokyo' },
    ].map(x => {
        let name = x.tz.split(/\//)[1]
        if (x.name) {
            name = x.name
        }
        return {dt:dt.setZone(x.tz), location: name}
    })
}

const interval = setInterval(updateClocks, 1000);
updateClocks();

onDestroy(() => clearInterval(interval));
</script>
<style>
    div.clock {
        text-align: center;
        margin: 1rem;
    }
    
    div.time {
        font-size: 90%;
    }
    
    svg.clock {
        width: 5rem;
    }
</style>

{#each clocks as clock}
<div class="clock">
    <div class="location">{clock.location}</div>
    <svg class="clock" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="45" fill="none" stroke="black" stroke-width="2"/>
        <line x1="50" y1="50" x2="50" y2="20" stroke="black" stroke-width="2"
            transform="rotate({minuteHandAngle(clock.dt)}  50 50)"/>
        <line x1="50" y1="50" x2="50" y2="10" stroke="black" stroke-width="2"
            transform="rotate({hourHandAngle(clock.dt)}  50 50)"/>
    </svg>
    <div class="time">{@html clock.dt.toFormat("DD<br/>t")}</div>
</div>
{/each}
