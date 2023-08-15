import NftCollections from './nft-collection'
import NftSearch from './nft-search'

const MarketPlace = ({ nfts, handleSearch }) => {
  return (
    <>
      <NftSearch handleSearch={handleSearch} />
      <NftCollections nfts={nfts} />
    </>
  )
}

export default MarketPlace
