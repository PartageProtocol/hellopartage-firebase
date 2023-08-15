import { useContext } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { Button } from 'components/form'
import {
  DiscordIcon,
  InstagramIcon,
  TwitterIcon,
  MailIcon,
  YoutubeIcon,
} from 'components/icons'
import NotificationContext from 'store/notification-context'
import styles from './footer.module.css'

const Footer = () => {
  const year = new Date().getFullYear()

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm()
  const notificationCtx = useContext(NotificationContext)

  const onSubmit = (data) => {
    notificationCtx.showNotification({
      title: 'Signing up...',
      message: 'Registering for footer.',
      status: 'pending',
    })

    // try {
    //   const res = await fetch('/api/footer', {
    //     method: 'POST',
    //     body: JSON.stringify({ email: data.email }),
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   })
    //   if (!res.ok) {
    //     console.log(res)

    //     throw data.message || 'Something went wrong.'
    //   }
    // } catch (error) {
    //   notificationCtx.showNotification({
    //     title: 'Error!',
    //     message: error.message || 'Something went wrong.',
    //     status: 'error',
    //   })
    // } finally {
    //   notificationCtx.showNotification({
    //     title: 'Success!',
    //     message: 'Successfully registered for footer.',
    //     status: 'success',
    //   })
    // }
    fetch('/api/newsletter', {
      method: 'POST',
      body: JSON.stringify({ email: data.email }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json()
        }

        return response.json().then((data) => {
          throw new Error(data.message || 'Something went wrong.')
        })
      })
      .catch((error) => {
        notificationCtx.showNotification({
          title: 'Error!',
          message: error.message || 'Something went wrong.',
          status: 'error',
        })
      })
      .finally((data) => {
        notificationCtx.showNotification({
          title: 'Success!',
          message: 'Successfully registered for footer.',
          status: 'success',
        })
      })
  }

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footer__container}>
          <div className={styles.footer__social}>
            <div className={styles.footer__logo}>
              <Link href="/">
                <div className={styles.logo}>Partage</div>
              </Link>
            </div>

            <p>Shared NFT Utilities, built on Bitcoin</p>

            <div className={styles.footer__social__community}>
              <p>Join our social medias</p>

              <ul>
                <li>
                  <a
                    target="_blank "
                    href="https://discord.com/invite/kxhnEMfTFW"
                    className="footer__link"
                  >
                    <DiscordIcon />
                  </a>
                </li>
                <li>
                  <a
                    target="_blank "
                    href="https://www.youtube.com/@partage_btc"
                    className="footer__link"
                  >
                    <YoutubeIcon />
                  </a>
                </li>
                <li>
                  <a
                    target="_blank "
                    href="https://twitter.com/partage_btc"
                    className="footer__link"
                  >
                    <TwitterIcon />
                  </a>
                </li>
                <li>
                  <a
                    target="_blank "
                    href="https://www.instagram.com/partage.btc/"
                    className="footer__link"
                  >
                    <InstagramIcon />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className={styles.footer__explore}>
            <h3>Explore</h3>

            <ul>
              <li>
                <a href="/">Marketplace</a>
              </li>
              <li>
                <a href="/">Rankings</a>
              </li>
              <li>
                <a href="/">Connect a wallet</a>
              </li>
            </ul>
          </div>

          <div className={styles.footer__subscribe}>
            <h3>Join Our Weekly Digest</h3>
            <p>Get exclusive promotions & updates straight to your inbox.</p>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className={styles.footer__form}
            >
              <div className={styles.footer__form__group}>
                <input
                  type="email"
                  placeholder="Enter Your Email Address"
                  aria-label="Your email"
                  {...register('email', {
                    required: 'This is required',
                    pattern: {
                      value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                      message: 'Email is not correct',
                    },
                  })}
                />
                <Button
                  label="Subscribe"
                  icon={<MailIcon size={20} />}
                  className={styles.footer__form__cta}
                />
              </div>
            </form>
          </div>
        </div>

        <div className={styles.footer__bottom}>
          <a
            className="caption"
            href="https://t.me/partagebtc"
            target="_blank"
            rel="noopener noreferrer"
          >
            Created by{` Ⓒ Partage, ${year}`}
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
