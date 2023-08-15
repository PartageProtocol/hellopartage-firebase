import Link from 'next/link'
import Image from 'next/image'
import styles from './card-provider.module.css'

const CardProvider = (props) => {
  const { id, name, data, image, index } = props

  const exploreLink = `/providers/${id}`

  return (
    <Link href={exploreLink} className={styles.provider}>
      {index && <div className={styles.provider__index}>{index}</div>}
      <div className={styles.provider__image}>
        <Image
          src={'/' + image}
          alt={name}
          width={150}
          height={150}
          className={styles.provider__avatar}
        />
      </div>

      <div className={styles.provider__content}>
        <h5>{name}</h5>
        <div className={styles.provider__summary}>
          <span>Total Sales:</span>
          <span className={styles.provider__sales}>{data}</span>
        </div>
      </div>
    </Link>
  )
}

export default CardProvider
