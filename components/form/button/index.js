import Link from 'next/link'
import clsx from 'clsx'
import styles from './button.module.css'

const Button = ({
  variant = 'primary',
  href,
  icon,
  label,
  onClick,
  className,
  ...props
}) => {
  if (href) {
    return (
      <Link
        href={href}
        className={clsx(
          styles.btn,
          {
            [styles['btn--primary']]: variant === 'primary',
            [styles['btn--outline']]: variant === 'outline',
          },
          className
        )}
      >
        {icon && <span className={styles.btn__icon}>{icon}</span>}
        {label && <span>{label}</span>}
      </Link>
    )
  }

  return (
    <button
      className={clsx(
        styles.btn,
        {
          [styles['btn--primary']]: variant === 'primary',
          [styles['btn--outline']]: variant === 'outline',
        },
        className
      )}
      onClick={onClick}
      {...props}
    >
      {icon && <span className={styles.btn__icon}>{icon}</span>}
      {label && <span>{label}</span>}
    </button>
  )
}

export default Button
