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
