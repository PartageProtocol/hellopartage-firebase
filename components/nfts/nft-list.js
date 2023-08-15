// this is a list of all NFTs
import NftItem from './nft-item'
import classes from './nft-list.module.css'

function NftList(props) {
  const { nfts } = props

  return (
    <ul className={classes.list}>
      {nfts?.map((nft) => (
        <NftItem
          key={nft.id}
          id={nft.id}
          name={nft.name}
          description={nft.description}
          provider={nft.provider}
          category={nft.category}
          image={nft.image}
        />
      ))}
    </ul>
  )
}

export default NftList
