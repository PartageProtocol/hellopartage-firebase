// use this page to filtered NFTs
import { Fragment } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

import { getFilteredNfts } from '../../helpers/api-util'
import NftList from '../../components/nfts/nft-list'
import ResultsTitle from '../../components/nfts/results-title'
import Button from '../../components/ui/button'
import ErrorAlert from '../../components/ui/error-alert'

function FilteredNftsPage() {
  const router = useRouter()

  const filterData = router.query.slug

  if (!filterData) {
    return <p className="center">Loading...</p>
  }

  const filteredCategory = filterData[0]
  const filteredProvider = filterData[1]

  if (filteredCategory.length === 0 || filteredProvider.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid filter, please adjust your values.</p>
          <div className="center">
            <Button link="/nfts">Show All NFTs</Button>
          </div>
        </ErrorAlert>
      </Fragment>
    )
  }

  const filteredNfts = getFilteredNfts({
    category: filteredCategory,
    provider: filteredProvider,
  })

  console.log(filteredNfts)

  if (!filteredNfts || filteredNfts.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No NFT found for the chosen filters.</p>
          <div className="center">
            <Button link="/nfts">Show All NFTs</Button>
          </div>
        </ErrorAlert>
      </Fragment>
    )
  }

  return (
    <Fragment>
      <Head>
        <title>Filtered NFTs</title>
        <meta
          name="description"
          content="NFTs search according to user filters."
        />
      </Head>
      <ResultsTitle category={filteredCategory} provider={filteredProvider} />
      <NftList items={filteredNfts} />
    </Fragment>
  )
}

export default FilteredNftsPage;