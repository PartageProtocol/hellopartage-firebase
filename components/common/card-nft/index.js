import Link from 'next/link'
import Image from 'next/image'
import ProviderIcon from 'components/icons/provider-icon'
import styles from './card-nft.module.css'

const CardNft = (props) => {
  const { id, name, provider, category, image } = props

  const exploreLink = `/nfts/${id}`

  return (
    <div className={styles.nft}>
      <Link href={exploreLink}>
        <div className={styles.nft__image}>
          <Image
            src={'/' + image}
            alt={name}
            width={250}
            height={250}
            className={styles.nft__avatar}
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className={styles.nft__content}>
          <h5>{name}</h5>
          <div className={styles.nft__provider}>
            <ProviderIcon />
            <p>{provider}</p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default CardNft
