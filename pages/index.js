/* a homepage usually stays relatively lean,
it doesn't have a dedicated css but uses global.css
and focuses on collecting the data from other components.

Partage's Homepage layer:
1) Nav bar
2) Hero => Present ourselves
3) Hero bis => How it works
4) Highlights: Trending Collections
5) Highlights: Top Rated Creators
6) Subscribe to newsletter
7) Footer
*/

import { useRef, useState, Fragment } from 'react'

import Head from 'next/head'

import Home from '@/modules/home'

import {
  getHighlightedNfts,
  getHighlightedProviders,
} from '../helpers/api-util'

const HomePage = ({ nfts, providers }) => {
  const [emailItems, setEmailItems] = useState([])

  const emailInputRef = useRef()

  function submitFormHandler(nft) {
    nft.preventDefault()

    const enteredEmail = emailInputRef.current.value

    const reqBody = { email: enteredEmail }

    // send push entered email request to api
    fetch('/api/emails', {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      // extracting the response data
      .then((response) => response.json())
      // log in the data
      .then((data) => console.log(data))
  }

  function loadEmailHandler() {
    // send a get request by passing url
    fetch('/api/emails')
      .then((response) => response.json())
      .then((data) => {
        setEmailItems(data.email)
      })
  }

  return (
    <Fragment>
      <Head>
        <title>Partage NFTs</title>
        <meta
          name="description"
          content="Shared NFT Utilities, built on Bitcoin."
        />
      </Head>
      <Home nfts={nfts} providers={providers} />
    </Fragment>
  )
}

export async function getStaticProps() {
  const highlightedNfts = await getHighlightedNfts()
  const highlightedProviders = await getHighlightedProviders()

  return {
    props: {
      nfts: highlightedNfts,
      providers: highlightedProviders,
    },
    // update page every 10 min
    revalidate: 1800,
  }
}

export default HomePage
