
import styles from './work.module.css'

type companyProps = {
    left, right, top, bottom: boolean
    name: string,
    localName?: string,
    location: string,
}

export function Company(props: companyProps) {
    return <>
        <style jsx>{`
    @media (max-width: 640px) {
      h3 { display: flex }
    }
  `}</style>
        <h3 className={styles.company}>
            <div>
                <div>{props.name}</div>
                <div
                    style={{ fontSize: '0.9rem' }}
                    className={styles.japanese}
                >{props.localName}</div>
            </div>
            <div className={styles.location}>{props.location}</div>
        </h3>
    </>
}

type titleProps = {
    name: string,
    from: string,
    to: string,
}

export function Title(props: titleProps) {
    return <>
        <div className={styles.title}>
            <div className={styles.years}>{props.from} &mdash; {props.to}</div>
            <div className="name">{props.name}</div>
        </div>
    </>
}