import { useMemo } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import { useMedia } from 'react-use'
import { Button } from 'components/form'
import { StatPair } from 'components/common'
import { GlobeIcon, PlusIcon, TwitterIcon } from 'components/icons'
import styles from './provider-summary.module.css'

const ProviderSummary = ({ name, twitter, website, bio, data, image }) => {
  const is1024 = useMedia('(min-width: 1024px)', false)

  const isMobile = useMemo(() => {
    return !is1024
  }, [is1024])

  return (
    <section className={styles.provider}>
      <div className={styles.provider__image}>
        <Image
          src="/partage.png"
          alt="Partage Logo"
          width={510}
          height={510}
          style={{ objectFit: 'cover' }}
        />
      </div>

      <div className="container">
        <div className={styles.provider__summary}>
          <div className={styles.provider__avatar}>
            <Image
              src={`/${image}`}
              alt={name}
              width={120}
              height={120}
              style={{ objectFit: 'cover' }}
            />
          </div>

          <h1 className="h2-sub">{name}</h1>
          <div className={styles.provider__action}>
            <Button label="0xc0E3...B79C" icon={<PlusIcon />} />
            <Button variant="outline" label="Follow" icon={<PlusIcon />} />
          </div>

          <div className={styles.provider__stat}>
            <StatPair label="Volume" data="250k+" />
            <StatPair label="NFTs Sold" data="50+" />
            <StatPair label="Followers" data="3000+" />
          </div>

          <h5 className={clsx('subheading', styles.provider__label)}>Bio</h5>
          <p>{bio}</p>

          <h5 className={clsx('subheading', styles.provider__label)}>Links</h5>
          <div className={styles.provider__social}>
            <a target="_blank " href={website} aria-label="website">
              <GlobeIcon size={isMobile ? 24 : 32} />
            </a>
            <a target="_blank " href={twitter} aria-label="discord">
              <TwitterIcon size={isMobile ? 24 : 32} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProviderSummary
