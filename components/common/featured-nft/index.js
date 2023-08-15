import Link from 'next/link'
import Image from 'next/image'
import ProviderIcon from 'components/icons/provider-icon'
import styles from './featured-nft.module.css'

const FeaturedNft = (props) => {
  const { id, name, provider, category, image } = props

  const exploreLink = `/nfts/${id}`

  return (
    <div className={styles.nft}>
      <div className={styles.nft__image}>
        <Link href={exploreLink}>
          <Image
            src={'/' + image}
            alt={name}
            width={250}
            height={250}
            className={styles.nft__avatar}
          />
        </Link>
      </div>

      <div className={styles.nft__content}>
        <Link href={exploreLink}>
          <h5>{name}</h5>
        </Link>
        <div className={styles.nft__provider}>
          <ProviderIcon />
          <p>{provider}</p>
        </div>
        {/* <div className={styles.category}>
            <CategoryIcon />
            <h3>{category}</h3>
          </div> */}
      </div>
    </div>
  )
}

export default FeaturedNft
