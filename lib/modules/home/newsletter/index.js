import { useContext } from 'react'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { Button } from 'components/form'
import { MailIcon } from 'components/icons'
import NotificationContext from 'store/notification-context'
import styles from './newsletter.module.css'

const Newsletter = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm()
  const notificationCtx = useContext(NotificationContext)

  const onSubmit = (data) => {
    notificationCtx.showNotification({
      title: 'Signing up...',
      message: 'Registering for newsletter.',
      status: 'pending',
    })

    // try {
    //   const res = await fetch('/api/newsletter', {
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
    //     message: 'Successfully registered for newsletter.',
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
          message: 'Successfully registered for newsletter.',
          status: 'success',
        })
      })
  }

  return (
    <section className="container section-y">
      <div className={styles.newsletter}>
        <div className={styles.newsletter__image}>
          <Image
            src="/partage.png"
            alt="Partage Logo"
            width={510}
            height={510}
            style={{ objectFit: 'cover' }}
          />
        </div>

        <div className={styles.newsletter__content}>
          <h2 className="h3">Join Our Weekly Digest</h2>
          <p className="subheading">
            Get exclusive promotions & updates straight to your inbox.
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className={styles.newsletter__form}
          >
            <div className={styles.newsletter__form__group}>
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
                className={styles.newsletter__form__cta}
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Newsletter
