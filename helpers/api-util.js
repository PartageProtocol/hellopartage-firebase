// nfts
export async function getAllNfts() {
  const response = await fetch(
    'https://partagedb-default-rtdb.firebaseio.com/nfts.json'
  )
  const data = await response.json()

  const nfts = []

  for (const key in data) {
    nfts.push({
      id: key,
      // not manually write all data but use ...
      ...data[key],
    })
  }

  return nfts
}

export async function getHighlightedNfts() {
  const allNfts = await getAllNfts()
  return allNfts.filter((nft) => nft.isHighlighted)
}

export async function getNftById(id) {
  const allNfts = await getAllNfts()
  return allNfts.find((nft) => nft.id === id)
}

export async function getFilteredNfts(searchFilter) {
  const allNfts = await getAllNfts()

  const { category, provider } = searchFilter

  let filteredNfts = allNfts.filter((nft) => {
    return nft.category === category && nft.provider === provider
  })

  return filteredNfts
}

// providers
export async function getAllProviders() {
  const response = await fetch(
    'https://partagedb-default-rtdb.firebaseio.com/providers.json'
  )
  const data = await response.json()

  const providers = []

  for (const key in data) {
    providers.push({
      id: key,
      // not manually write all data but use ...
      ...data[key],
    })
  }

  return providers
}

export async function getHighlightedProviders() {
  const allProviders = await getAllProviders()
  return allProviders.filter((provider) => provider.isHighlighted)
}

export async function getProviderById(id) {
  const allProviders = await getAllProviders()
  return allProviders.find((provider) => provider.id === id)
}

export async function getProviderNfts(providerFilter) {
  const { provider } = providerFilter

  const allNfts = await getAllNfts()

  let providerNfts = allNfts.filter((nft) => {
    const providerNft = nft.provider
    return providerNft === provider
  })

  return providerNfts
}
