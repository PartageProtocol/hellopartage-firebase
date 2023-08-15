import { AppConfig, UserSession, openContractCall } from '@stacks/connect'
import {
  uintCV,
  standardPrincipalCV,
  stringAsciiCV,
  callReadOnlyFunction,
  noneCV,
  tupleCV,
  AnchorMode,
  makeSTXTokenTransfer,
  broadcastTransaction,
  NonFungibleConditionCode,
  FungibleConditionCode,
  makeStandardNonFungiblePostCondition,
  makeStandardSTXPostCondition,
  createAssetInfo,
  bufferCVFromString,
} from '@stacks/transactions'
import { StacksTestnet, StacksMainnet } from '@stacks/network'

export const contractEvents = () => {
  const appConfig = new AppConfig(['publish_data'])
  const userSession = new UserSession({ appConfig })

  const contractAddress = 'ST2NC54N30J95AHB55W6VY3MF9X4G07F4XCPVYKGD'
  const contractName = 'partage-v1'
  const network = new StacksTestnet()

  const openContract = async (functionName, functionArgs) => {
    try {
      const functionCall = await openContractCall({
        contractAddress,
        contractName,
        functionName,
        functionArgs: functionArgs,
        senderKey: userSession.loadUserData().appPrivateKey,
        network,
        postConditionMode: 1,
      })
      return 'Succesfully!'
    } catch (error) {
      console.log(error)
      return false
    }
  }

  // const openContractPost = async (functionName, functionArgs) => {
  //   const assetAddress = contractAddress
  //   const postConditionAddress =
  //     userSession.loadUserData().profile.stxAddress.testnet

  //   const nftPostConditionCode = NonFungibleConditionCode.DoesNotSend
  //   const assetContractName = 'partage-v1'
  //   const assetName = 'fractions'
  //   const tokenAssetName = bufferCVFromString('fractions')
  //   const nonFungibleAssetInfo = createAssetInfo(
  //     assetAddress,
  //     assetContractName,
  //     assetName
  //   )

  //   const stxConditionCode = FungibleConditionCode.GreaterEqual
  //   const stxConditionAmount = 1000000 // denoted in microstacks

  //   const postConditions = [
  //     makeStandardNonFungiblePostCondition(
  //       postConditionAddress,
  //       nftPostConditionCode,
  //       nonFungibleAssetInfo,
  //       tokenAssetName
  //     ),
  //     makeStandardSTXPostCondition(
  //       postConditionAddress,
  //       stxConditionCode,
  //       stxConditionAmount
  //     ),
  //   ]
  //   try {
  //     const functionCall = await openContractCall({
  //       contractAddress,
  //       contractName,
  //       functionName,
  //       functionArgs: functionArgs,
  //       senderKey: userSession.loadUserData().appPrivateKey,
  //       network,
  //       postConditions,
  //       postConditionMode: 2,
  //     })
  //     return 'Succesfully!'
  //   } catch (error) {
  //     console.log(error)
  //     return false
  //   }
  // }

  const getPlatformFees = async () => {
    const functionName = 'get-platform-fees'
    const functionArgs = []

    const options = {
      contractAddress,
      contractName: 'partage-v1',
      functionName,
      functionArgs,
      network,
      senderAddress: userSession.loadUserData().profile.stxAddress.testnet,
    }

    const result = await callReadOnlyFunction(options)
    alert('Platform fees is: ' + result.value.address.hash160)
  }

  const getUtilityProvider = async () => {
    const functionName = 'get-utility-provider'
    const functionArgs = []

    const options = {
      contractAddress,
      contractName: 'partage-v1',
      functionName,
      functionArgs,
      network,
      senderAddress: userSession.loadUserData().profile.stxAddress.testnet,
    }

    const result = await callReadOnlyFunction(options)
    return result.value.address.hash160
  }

  const getOwner = async (tokenId) => {
    const functionName = 'get-owner'
    const functionArgs = [uintCV(+tokenId)]

    const options = {
      contractAddress,
      contractName: 'partage-v1',
      functionName,
      functionArgs,
      network,
      senderAddress: userSession.loadUserData().profile.stxAddress.testnet,
    }

    const result = await callReadOnlyFunction(options)
    return result.value.value.address.hash160
  }

  const getUri = async (tokenId) => {
    const functionName = 'get-token-uri'
    const functionArgs = [uintCV(+tokenId)]

    const options = {
      contractAddress,
      contractName: 'partage-v1',
      functionName,
      functionArgs,
      network,
      senderAddress: userSession.loadUserData().profile.stxAddress.testnet,
    }

    const result = await callReadOnlyFunction(options)
    return result.value.value.data
  }

  const getTotalSupply = async (tokenId) => {
    const functionName = 'get-total-supply'
    const functionArgs = [uintCV(+tokenId)]

    const options = {
      contractAddress,
      contractName: 'partage-v1',
      functionName,
      functionArgs,
      network,
      senderAddress: userSession.loadUserData().profile.stxAddress.testnet,
    }

    const result = await callReadOnlyFunction(options)
    return result.value.value
  }

  const getBalance = async () => {
    const token = prompt('Enter ID:')
    const tokenId = token != null ? +token : -1

    const functionName = 'get-balance'
    const functionArgs = [
      uintCV(tokenId),
      standardPrincipalCV(
        userSession.loadUserData().profile.stxAddress.testnet
      ),
    ]

    const options = {
      contractAddress,
      contractName: 'partage-v1',
      functionName,
      functionArgs,
      network,
      senderAddress: userSession.loadUserData().profile.stxAddress.testnet,
    }

    const result = await callReadOnlyFunction(options)
    alert('Balance: ' + result.value.value)
  }

  const getOverAllBalance = async () => {
    const functionName = 'get-overall-balance'
    const functionArgs = [
      standardPrincipalCV(
        userSession.loadUserData().profile.stxAddress.testnet
      ),
    ]

    const options = {
      contractAddress,
      contractName: 'partage-v1',
      functionName,
      functionArgs,
      network,
      senderAddress: userSession.loadUserData().profile.stxAddress.testnet,
    }

    const result = await callReadOnlyFunction(options)
    alert('Over all balance: ' + result.value.value)
  }

  const setUtilityProvider = async () => {
    const functionName = 'set-utility-provider'

    const adressPrompt = prompt('Enter new adress:')
    const adress = adressPrompt != null ? adressPrompt : 'null'

    const functionArgs = [standardPrincipalCV(adress)]

    openContract(functionName, functionArgs)
  }

  const setPlatformFees = async () => {
    const functionName = 'set-platform-fees'

    const adressPrompt = prompt('Enter new adress:')
    const adress = adressPrompt != null ? adressPrompt : 'null'

    const functionArgs = [standardPrincipalCV(adress)]

    openContract(functionName, functionArgs)
  }

  const mint = async () => {
    const functionName = 'mint-nft'

    const uriPrompt = prompt('Enter uri:')
    const uri = uriPrompt != null ? uriPrompt : 'none'

    const functionArgs = [
      standardPrincipalCV(
        userSession.loadUserData().profile.stxAddress.testnet
      ),
      stringAsciiCV(uri),
    ]

    openContract(functionName, functionArgs)
  }

  const burn = async () => {
    const functionName = 'burn-nft'
    const token = prompt('Enter ID:')
    const tokenId = token != null ? +token : -1

    const functionArgs = [
      uintCV(tokenId),
      standardPrincipalCV(
        userSession.loadUserData().profile.stxAddress.testnet
      ),
    ]

    openContract(functionName, functionArgs)
  }

  const burnFractions = async () => {
    const functionName = 'burn-fractions'
    const token = prompt('Enter ID:')
    const tokenId = token != null ? +token : -1

    const functionArgs = [
      uintCV(tokenId),
      standardPrincipalCV(
        userSession.loadUserData().profile.stxAddress.testnet
      ),
    ]

    openContract(functionName, functionArgs)
  }

  const fractionalize = async () => {
    const functionName = 'fractionalize-nft'
    const tokenPrompt = prompt('Enter ID:')
    const tokenId = tokenPrompt != null ? +tokenPrompt : -1

    const supplyPrompt = prompt('Enter supply:')
    const supply = supplyPrompt != null ? +supplyPrompt : -1

    const functionArgs = [
      uintCV(tokenId),
      standardPrincipalCV(
        userSession.loadUserData().profile.stxAddress.testnet
      ),
      uintCV(supply),
    ]

    openContract(functionName, functionArgs)
  }

  const transferNFT = async () => {
    const functionName = 'transfer-nft'
    const tokenPrompt = prompt('Enter ID:')
    const tokenId = tokenPrompt != null ? +tokenPrompt : -1

    const recipientPrompt = prompt('Enter recipient adress:')
    const recipient = recipientPrompt != null ? recipientPrompt : 'null'

    const functionArgs = [
      uintCV(tokenId),
      standardPrincipalCV(
        userSession.loadUserData().profile.stxAddress.testnet
      ),
      standardPrincipalCV(recipient),
    ]

    openContract(functionName, functionArgs)
  }

  const transfer = async () => {
    const functionName = 'transfer'
    const tokenPrompt = prompt('Enter ID:')
    const tokenId = tokenPrompt != null ? +tokenPrompt : -1

    const amountPrompt = prompt('Enter amount:')
    const amount = amountPrompt != null ? +amountPrompt : -1

    const recipientPrompt = prompt('Enter recipient adress:')
    const recipient = recipientPrompt != null ? recipientPrompt : 'null'

    const functionArgs = [
      uintCV(tokenId),
      uintCV(amount),
      standardPrincipalCV(
        userSession.loadUserData().profile.stxAddress.testnet
      ),
      standardPrincipalCV(recipient),
    ]

    openContract(functionName, functionArgs)
  }

  const buyFractions = async () => {
    const functionName = 'buy-fractions'
    const listingIdPrompt = prompt('Enter listing ID:')
    const listingId = listingIdPrompt != null ? +listingIdPrompt : 'none'

    const amountPrompt = prompt('Enter amount:')
    const amount = amountPrompt != null ? +amountPrompt : 'none'

    const functionArgs = [uintCV(listingId), uintCV(amount)]

    openContract(functionName, functionArgs)
  }

  const buyNft = async () => {
    const functionName = 'buy-nft'
    const listingIdPrompt = prompt('Enter listing ID:')
    const listingId = listingIdPrompt != null ? +listingIdPrompt : -1

    const functionArgs = [uintCV(listingId)]

    openContract(functionName, functionArgs)
  }

  const listFractions = async () => {
    const functionName = 'list-fractions'

    const tokenIdPrompt = prompt('Token id:')
    const tokenId = tokenIdPrompt != null ? +tokenIdPrompt : -1

    const amountPrompt = prompt('Enter amount:')
    const amount = amountPrompt != null ? +amountPrompt : -1

    const unitPricePrompt = prompt('Unit price:')
    const unitPrice = unitPricePrompt != null ? +unitPricePrompt : -1

    const expiryPrompt = prompt('Expiry:')
    const expiry = expiryPrompt != null ? +expiryPrompt : -1

    // const takerPrompt = prompt('Taker(opional):')
    // const taker = takerPrompt != null ? takerPrompt : 'none'

    const functionArgs = [
      tupleCV({
        'token-id': uintCV(tokenId),
        amount: uintCV(amount),
        'unit-price': uintCV(unitPrice),
        expiry: uintCV(expiry),
        taker: noneCV(),
      }),
    ]

    openContract(functionName, functionArgs)
  }

  const listNft = async () => {
    const functionName = 'list-nft'

    const expiryPrompt = prompt('Expiry:')
    const expiry = expiryPrompt != null ? +expiryPrompt : -1

    const takerPrompt = prompt('Taker(opional):')
    const taker = takerPrompt != null ? takerPrompt : 'null'

    const tokenIdPrompt = prompt('Token id:')
    const tokenId = tokenIdPrompt != null ? +tokenIdPrompt : -1

    const unitPricePrompt = prompt('Unit price:')
    const unitPrice = unitPricePrompt != null ? +unitPricePrompt : -1

    const functionArgs = [
      uintCV(expiry),
      standardPrincipalCV(taker),
      uintCV(tokenId),
      uintCV(unitPrice),
    ]

    openContract(functionName, functionArgs)
  }

  const unlistFractions = async () => {
    const functionName = 'unlist-fractions'
    const listingIdPrompt = prompt('Enter listing ID:')
    const listingId = listingIdPrompt != null ? +listingIdPrompt : -1

    const amountPrompt = prompt('Enter amount:')
    const amount = amountPrompt != null ? +amountPrompt : -1

    const functionArgs = [uintCV(listingId), uintCV(amount)]

    openContract(functionName, functionArgs)
  }

  return {
    burn,
    burnFractions,
    mint,
    fractionalize,
    transferNFT,
    getOwner,
    getUri,
    getTotalSupply,
    getOverAllBalance,
    getBalance,
    listFractions,
    unlistFractions,
    transfer,
    buyFractions,
    setUtilityProvider,
    setPlatformFees,
    listNft,
    buyNft,
    getPlatformFees,
    getUtilityProvider,
  }
}
