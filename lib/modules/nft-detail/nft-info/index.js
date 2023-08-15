import clsx from 'clsx'
import styles from './nft-info.module.css'

const NftInfo = ({ name, provider, description, category }) => {
  return (
    <section className="container section-y">
      <div className={styles.nft}>
        <div className={styles.nft__info}>
          <h1 className="h2-sub">{name}</h1>

          <h5 className={clsx('subheading', styles.nft__label)}>Created By</h5>
          <div className={styles.nft__provider}>
            <p className="subheading">{provider}</p>
          </div>

          <h5 className={clsx('subheading', styles.nft__label)}>Description</h5>
          <p className="subheading">{description}</p>

          <h5 className={clsx('subheading', styles.nft__label)}>Tags</h5>
          <div className={styles.nft__category}>
            <div className={styles.nft__tag}>
              <span>{category}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NftInfo
