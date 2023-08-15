import NftList from 'components/nft-list'
import styles from './nft-collection.module.css'

const NftCollections = ({ nfts }) => {
  return (
    <section className={styles.nfts}>
      <div className="container">
        <NftList nfts={nfts} />
      </div>
    </section>
  )
}

export default NftCollections
