import Image from 'next/image'
import styles from './nft-banner.module.css'

const NftBanner = ({ image, title }) => {
  return (
    <section className={styles.banner}>
      <Image
        src={`/images/site/nft_banner.jpg`}
        alt={title}
        width={510}
        height={510}
        style={{ objectFit: 'cover' }}
        className={styles.banner__image}
      />
    </section>
  )
}

export default NftBanner
