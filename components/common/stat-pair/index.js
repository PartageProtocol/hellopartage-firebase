import styles from './stat-pair.module.css'

const StatPair = ({ label, data }) => {
  return (
    <div className={styles.stat}>
      <h5 className="h4">{data}</h5>
      <p className="subheading">{label}</p>
    </div>
  )
}

export default StatPair
