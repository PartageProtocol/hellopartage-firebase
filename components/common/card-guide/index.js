import styles from './guide-card.module.css'

const CardGuide = ({ img, title, text }) => {
  return (
    <div className={styles.card}>
      <figure className={styles.card__image}>
        <img src={img} alt="img" />
      </figure>
      <div className={styles.card__info}>
        <h4 className="subheading">{title}</h4>
        <p className="caption">{text}</p>
      </div>
    </div>
  )
}

export default CardGuide
