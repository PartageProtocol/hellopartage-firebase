import clsx from 'clsx'
import { CardGuide } from 'components/common'
import styles from './guide.module.css'

const Guide = () => {
  const cards = [
    {
      img: './images/site/wallet.png',
      title: 'Setup Your wallet',
      text: 'Connect your prefered STX wallet by clicking the Connect Wallet button in the top of this page.',
    },
    {
      img: './images/site/browse.png',
      title: 'Browse categories',
      text: 'Browse the whole available items in the markeplace or refine your research by category.',
    },
    {
      img: './images/site/purchase.png',
      title: 'Purchase NFTs',
      text: 'Purchase timeshares in our selection of utility NFTs and redeem it from the utility provider.',
    },
  ]

  return (
    <section className={clsx(styles.guide, 'container section-y')}>
      <h2 className="h3">How it works</h2>
      <p className="subheading">Find out how to get started</p>
      <div className={styles.guide__list}>
        {cards.map((card) => (
          <CardGuide
            key={card.title}
            img={card.img}
            title={card.title}
            text={card.text}
          />
        ))}
      </div>
    </section>
  )
}

export default Guide
