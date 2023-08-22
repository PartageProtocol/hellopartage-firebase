import Button from '../components/ui/button'

import { contractEvents } from '../helpers/contract-events'

function adminPage() {
  const { mint, setPlatformFees, setUtilityProvider } = contractEvents()
  return (
    <div>
      <h1>Welcome to admin panel</h1>
      <h2>Here you can mint NFT</h2>
      <div>
        <Button onClick={() => mint()}>Mint NFT</Button>
      </div>
      <div>
        <Button onClick={() => setUtilityProvider()}>
          Set utility provider
        </Button>
        <Button onClick={() => setPlatformFees()}>Set platform fees</Button>
      </div>
    </div>
  )
}

export default adminPage
