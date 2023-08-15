// the single NFT detail page
import { Fragment, useEffect, useState } from 'react'
import Head from 'next/head'

import Button from '../../components/ui/button'
import Comments from 'components/input/comments'
import NftDetail from '@/modules/nft-detail'

import { getNftById, getHighlightedNfts } from 'helpers/api-util'
import { contractEvents } from '../../helpers/contract-events'

const NftDetailPage = ({ nft }) => {
  const [owner, setOwner] = useState('')
  const [uri, setUri] = useState('')
  const [provider, setProvider] = useState('')
  const [supply, setSupply] = useState('')
  const {
    getOwner,
    getUri,
    getTotalSupply,
    buyFractions,
    buyNft,
    getUtilityProvider,
  } = contractEvents()
  const nftid = nft.id.slice(1, 3)
  if (!nft) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    )
  }

  useEffect(() => {
    getOwner(nftid).then((data) => setOwner(data))
    getUri(nftid).then((data) => setUri(data))
    getUtilityProvider(nftid).then((data) => setProvider(data))
    getTotalSupply(nftid).then((data) => setSupply(data))
  }, [])

  return (
    <Fragment>
      <Head>
        <title>{nft.name}</title>
        <meta name="description" content={nft.description} />
      </Head>
      <NftDetail nft={nft} />
      <div className="center">
        <Button onClick={() => buyNft()}>Buy</Button>
        <Button onClick={() => buyFractions()}>Buy-fractions</Button>
      </div>
      <div>
        <p>{'The owner is: ' + owner}</p>
        <p>{'The uri is: ' + uri}</p>
        <p>{'The provider is: ' + provider}</p>
        <p>{'The supply is: ' + supply}</p>
        {/* <Button onClick={() => getOwner(nftid)}>Owner?</Button> */}
        {/* <Button onClick={() => getUri(nftid)}>Token uri?</Button> */}
        {/* <Button onClick={() => getUtilityProvider()}>Utility provider?</Button> */}
        {/* <Button onClick={() => getTotalSupply(nftid)}>Total supply?</Button> */}
      </div>
      <Comments nftId={nft.id} />
    </Fragment>
  )
}

export async function getStaticProps(context) {
  const nftId = context.params.nftId

  const nft = await getNftById(nftId)

  return {
    props: {
      nft,
    },
    revalidate: 30,
  }
}

export async function getStaticPaths() {
  const nfts = await getHighlightedNfts()

  const paths = nfts.map((nft) => ({ params: { nftId: nft.id } }))

  return {
    paths: paths,
    // let getstatic know if there are more paths
    fallback: 'blocking',
  }
}

export default NftDetailPage
