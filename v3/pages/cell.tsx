
export type CellProps = {
    left, right, top, bottom: boolean
    color: string,
}

export function Cell(props: CellProps) {
    let u = 4;

    return <>
        <rect fill={props.color} x={u} y={u} width={u} height={u}></rect>
        {props.left && <rect fill={props.color} x={0} y={u} width={u} height={u}></rect>}
        {props.right && <rect fill={props.color} x={u * 2} y={u} width={u} height={u}></rect>}
        {props.top && <rect fill={props.color} x={u} y={0} width={u} height={u}></rect>}
        {props.bottom && <rect fill={props.color} x={u} y={u * 2} width={u} height={u}></rect>}
    </>
}