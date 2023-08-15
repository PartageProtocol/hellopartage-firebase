import ProviderSummary from './provider-summary'

const Provider = ({ provider }) => {
  return (
    <>
      <ProviderSummary {...provider} />
    </>
  )
}

export default Provider
