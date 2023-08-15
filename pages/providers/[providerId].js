// the Utility Provider detail page
import Head from 'next/head'
import { Fragment } from 'react'

import Provider from '@/modules/provider'
import NftList from 'components/nft-list'
import {
  getAllProviders,
  getProviderById,
  getProviderNfts,
} from 'helpers/api-util'

// builds a provider page from the properties of a selected provider id
function ProviderDetailPage({ provider, providerNfts }) {
  if (!provider) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <Fragment>
      <Head>
        <title>{provider.name}</title>
        <meta name="description" content={provider.bio} />
      </Head>

      <Provider provider={provider} />

      <h2>Tab Bar: Created {provider.data} NFTs</h2>
      <h1>NFTs from this provider</h1>
      <NftList nfts={providerNfts} />
    </Fragment>
  )
}

// gets a provider properties by the provider id
export async function getStaticProps(context) {
  const providerId = context.params.providerId

  const provider = await getProviderById(providerId)
  const providerNfts = await getProviderNfts(providerId)

  return {
    props: {
      provider,
      providerNfts: providerNfts,
    },
    revalidate: 1800,
  }
}

// gets a provider id by the path queried
export async function getStaticPaths() {
  const providers = await getAllProviders()

  const paths = providers.map((provider) => ({
    params: { providerId: provider.id },
  }))

  return {
    paths: paths,
    // let getstatic know if there are more paths
    fallback: 'blocking',
  }
}

export default ProviderDetailPage
