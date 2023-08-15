import clsx from 'clsx'
import { FeaturedNft } from 'components/common'
import styles from './trending-nfts.module.css'

const TrendingNfts = ({ nfts }) => {
  return (
    <section className={clsx(styles.trending, 'container section-y')}>
      <h2 className="h3">Trending NFTs</h2>
      <p className="subheading">Checkout Our Most Trending NFTs.</p>

      <div className={styles.trending__list}>
        {nfts?.map((nft) => (
          <FeaturedNft key={nft.id} {...nft} />
        ))}
      </div>
    </section>
  )
}

export default TrendingNfts
