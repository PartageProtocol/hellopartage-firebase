import clsx from 'clsx'
import { CardProvider } from 'components/common'
import { Button } from 'components/form'
import styles from './top-providers.module.css'
import RocketIcon from 'components/icons/rocket-icon'

const TopProviders = ({ providers }) => {
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
          label="View Rankings"
          icon={<RocketIcon />}
          className={styles.providers__cta}
        />
      </div>

      <div className={styles.providers__list}>
        {providers?.map((provider, index) => (
          <CardProvider key={provider.id} index={index + 1} {...provider} />
        ))}
      </div>

      <Button
        variant="outline"
        label="View Rankings"
        icon={<RocketIcon />}
        className={clsx(
          styles.providers__cta,
          styles['providers__cta--mobile']
        )}
      />
    </section>
  )
}

export default TopProviders
