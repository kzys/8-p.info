
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
                <div className="en">{props.name}</div>
                <div className="ja">{props.localName}</div>
            </div>
            <div className={styles.location}>{props.location}</div>
        </h3>
    </>
}

type titleProps = {
    name: string,
    years: string,
}

export function Title(props: titleProps) {
    return <>
        <div className={styles.title}>
            <div className={styles.years}>{props.years}</div>
            <div className="name">{props.name}</div>
        </div>
    </>
}