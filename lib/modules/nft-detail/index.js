import NftBanner from './nft-banner'
import NftInfo from './nft-info'
import Image from 'next/image'

const NftDetail = ({ nft }) => {
  return (
    <>
      <NftBanner image={nft.image} title={nft.name} />
      <Image
        src={`/${nft.image}`}
        alt={nft.name}
        width={510}
        height={510}
        style={{ objectFit: 'cover' }}
      />
      <NftInfo {...nft} />
    </>
  )
}

export default NftDetail
