import { CardNft } from 'components/common'
import styles from './nfts-list.module.css'

const NftList = ({ nfts }) => {
  if (!nfts?.length) return <></>

  return (
    <div className={styles.nfts}>
      <div className={styles.nfts__list}>
        {nfts?.map((nft) => (
          <CardNft key={nft.id} {...nft} />
        ))}
      </div>
    </div>
  )
}

export default NftList
