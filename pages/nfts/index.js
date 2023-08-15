// marketplace page with all NFTs rendered from NftList
import { Fragment } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

import MarketPlace from '@/modules/marketplace'
import { getAllNfts } from 'helpers/api-util'

const NftsPage = ({ nfts }) => {
  const router = useRouter()

  // find the nft queried in browser
  const handleFindNfts = (category, provider) => {
    const fullPath = `/nfts/${category}/${provider}`
    router.push(fullPath)
  }

  return (
    <Fragment>
      <Head>
        <title>Partage's Marketplace</title>
        <meta
          name="description"
          content="Shared NFT Utilities built on the Bitcoin blockchain."
        />
      </Head>

      <MarketPlace nfts={nfts} handleSearch={handleFindNfts} />
    </Fragment>
  )
}

// get all nfts from database
export async function getStaticProps() {
  const nfts = await getAllNfts()

  return {
    props: {
      nfts,
    },
    revalidate: 60,
  }
}

export default NftsPage
