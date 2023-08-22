import Image from 'next/image'
import clsx from 'clsx'
import { Button } from 'components/form'
import { StatPair } from 'components/common'
import { RocketIcon } from 'components/icons'
import styles from './hero.module.css'

const Hero = () => {
  return (
    <section className="container section-y">
      <div className={styles.hero}>
        <div className={styles.hero__content}>
          <h1>Shared NFT Utilities</h1>
          <p>
            Partage is a p2p sharing system for Utility NFTs. 
            Providers mint, fractionalize and share supplies 
            and utilities on the Bitcoin blockchain.
          </p>

          <div
            className={clsx(
              styles.hero__results,
              styles['hero__results--desktop']
            )}
          >
            <Button
              label="Get Started"
              icon={<RocketIcon />}
              className={styles.hero__cta}
              href="/authPage"
            />

            <div className={styles.hero__data}>
              <StatPair label="Providers" data="16" />
              <StatPair label="Categories" data="10" />
            </div>
          </div>
        </div>

        <div className={styles.hero__image}>
        <Image
            src="/motionLogo.gif"
            alt="Partage Logo"
            width={510}
            height={510}
            style={{ objectFit: 'cover' }}
          />
        </div>

        <div
          className={clsx(
            styles.hero__results,
            styles['hero__results--mobile']
          )}
        >
          <Button
            label="Get Started"
            icon={<RocketIcon />}
            className={styles.hero__cta}
            href="/authPage"
          />

          <div className={styles.hero__data}>
            <StatPair label="Providers" data="16" />
            <StatPair label="Categories" data="10" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
