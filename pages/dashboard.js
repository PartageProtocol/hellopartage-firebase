import Button from '../components/ui/button'

import { useEffect, useState } from 'react'

import { contractEvents } from '../helpers/contract-events'

function dashboardPage() {
  const [adressTest, setAdressTest] = useState('')

  const {
    transferNFT,
    transfer,
    burn,
    fractionalize,
    burnFractions,
    getOverAllBalance,
    getBalance,
    listFractions,
    unlistFractions,
    listNft,
  } = contractEvents()

  useEffect(() => {
    const newAdress = JSON.parse(localStorage.getItem('blockstack-session'))
    setAdressTest(newAdress.userData.profile.stxAddress.testnet)
  }, [])

  return (
    <div>
      <h1>User Dashboard (rankings + my-favorites)</h1>
      <h2>combining last sales page + my favorites from react project</h2>
      <p>Testnet adress is: {adressTest}</p>
      <div>
        <Button onClick={() => listNft()}>List NFT</Button>
        <Button>Unlist NFT</Button>
        <Button onClick={() => transferNFT()}>Transfer NFT</Button>
        <Button onClick={() => transfer()}>Transfer</Button>
        <Button onClick={() => burn()}>Burn NFT</Button>
        <Button onClick={() => fractionalize()}>Fractionalize NFT</Button>
        <Button onClick={() => listFractions()}>List Fractions</Button>
        <Button onClick={() => unlistFractions()}>Unlist Fractions</Button>
        <Button onClick={() => burnFractions()}>Burn Fractions</Button>
      </div>
      <div>
        <Button onClick={() => getBalance()}>Get balance</Button>
        <Button onClick={() => getOverAllBalance()}>Get overall balance</Button>
      </div>
    </div>
  )
}

export default dashboardPage

/*
import { getServerSession } from "next-auth/next"

import ConnectWallet from '../components/ConnectWallet'
import UserProfile from '../components/profile/user-profile'
import Button from '../components/ui/button'

import { contractEvents } from '../helpers/contract-events'

import { authOptions } from './api/auth/[...nextauth]'

import { removeUndefinedValues } from 'helpers/utils'

function dashboardPage() {
  const {
    transferNFT,
    transferFractions,
    burn,
    fractionalize,
    burnFractions,
    getOverAllBalance,
    getBalance,
    listFractions,
    unlistFractions,
    listNft,
  } = contractEvents()
  return (
    <div>
      <UserProfile />
      <div>
        {/* ConnectWallet file: `../components/ConnectWallet.js` *}
        <ConnectWallet />
      </div>
      <div>
        <Button onClick={() => listNft()}>List NFT</Button>
        <Button>Unlist NFT</Button>
        <Button onClick={() => transferNFT()}>Transfer NFT</Button>
        <Button onClick={() => transferFractions()}>Transfer Fractions</Button>
        <Button onClick={() => burn()}>Burn NFT</Button>
        <Button onClick={() => fractionalize()}>Fractionalize NFT</Button>
        <Button onClick={() => listFractions()}>List Fractions</Button>
        <Button onClick={() => unlistFractions()}>Unlist Fractions</Button>
        <Button onClick={() => burnFractions()}>Burn Fractions</Button>
      </div>
      <div>
        <Button onClick={() => getBalance()}>Get balance</Button>
        <Button onClick={() => getOverAllBalance()}>Get overall balance</Button>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions)

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    }
  }
  
  const updatedSession = removeUndefinedValues(session)

  return {
    props: { updatedSession },
  }
}

export default dashboardPage
*/