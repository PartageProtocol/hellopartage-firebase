import clsx from 'clsx'
import { CardProvider } from 'components/common'
import { Button } from 'components/form'
import styles from './top-providers.module.css'
import StorefrontIcon from 'components/icons/storefront-icon'

const TopProviders = ({ providers }) => {
  const visitMarketplace = `/nfts`

  return (
    <section className={clsx(styles.providers, 'container section-y')}>
      <div className={styles.providers__heading}>
        <div>
          <h2 className="h3">Top Utility Providers</h2>
          <p className="subheading">
            Checkout Our Top Rated Utility Providers.
          </p>
        </div>

        <Button
          variant="outline"
          label="Visit marketplace"
          icon={<StorefrontIcon />}
          className={styles.providers__cta}
          link={visitMarketplace}
        />
      </div>

      <div className={styles.providers__list}>
        {providers?.map((provider, index) => (
          <CardProvider key={provider.id} index={index + 1} {...provider} />
        ))}
      </div>

      <Button
        variant="outline"
        label="Visit marketplace"
        icon={<StorefrontIcon />}
        link={visitMarketplace}
        className={clsx(
          styles.providers__cta,
          styles['providers__cta--mobile']
        )}
      />
    </section>
  )
}

export default TopProviders
