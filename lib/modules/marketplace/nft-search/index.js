import { useRef } from 'react'
import clsx from 'clsx'
import { Button } from 'components/form'
import styles from './nft-search.module.css'

const NftSearch = ({ handleSearch }) => {
  const categoryInputRef = useRef()
  const providerInputRef = useRef()

  const submitHandler = (event) => {
    event.preventDefault()

    const selectedCategory = categoryInputRef.current.value
    const selectedProvider = providerInputRef.current.value

    handleSearch(selectedCategory, selectedProvider)
  }

  return (
    <section className={clsx(styles.search, 'container section-y')}>
      <h1 className="h2-sub">Browse Marketplace</h1>
      <p className="subheading">
        Browse through more than 50k NFTs on the NFT Marketplace.
      </p>

      <div className={styles.search__nft}>
        <form className={styles.search__form} onSubmit={submitHandler}>
          <div className={styles.controls}>
            <div className={styles.control}>
              <label htmlFor="category">Category</label>
              <select id="category" ref={categoryInputRef}>
                <option value="PhysicalEvent">Physical event</option>
                <option value="OnlineItem">Online item</option>
              </select>
            </div>
            <div className={styles.control}>
              <label htmlFor="provider">Provider</label>
              <select id="provider" ref={providerInputRef}>
                <option value="Tare">Tare</option>
                <option value="Stacksboard">Stacksboard</option>
              </select>
            </div>
          </div>
          <Button label="Find NFTs" />
        </form>
      </div>
    </section>
  )
}

export default NftSearch
