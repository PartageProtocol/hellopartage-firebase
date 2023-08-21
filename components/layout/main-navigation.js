import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useState, useEffect } from 'react'

import styles from './main-navigation.module.css'
import Button from '../ui/button'
import classes from '../ui/button.module.css'

import BurgerIcon from 'components/icons/burger-icon'
import UserIcon from '../icons/user-icon'

import { AppConfig, UserSession } from '@stacks/connect'

const MainNavigation = () => {
  const { data: session, status } = useSession()
  const loading = status === 'loading'

  const [userData, setUserData] = useState({})
  const [loggedIn, setLoggedIn] = useState(false)

  const appConfig = new AppConfig(['publish_data'])
  const userSession = new UserSession({ appConfig })

  useEffect(() => {
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then((userData) => {
        setUserData(userData)
      })
    } else if (userSession.isUserSignedIn()) {
      setLoggedIn(true)
      setUserData(userSession.loadUserData())
    }
  }, [])

  const loginHandler = `/auth/`

  const logoutHandler = () => {
    signOut({ callbackUrl: "/" })
  }

  return (
    <header className="container">
      <div className={styles.header}>
        <div className={styles.logo}>
          <Link href="/">Partage</Link>
        </div>
        <nav className={styles.nav}>
          <div className={styles.nav__icon}>
            <BurgerIcon />
          </div>
          <ul className={styles.nav__menu}>
            <li>
              <Link href="/nfts">Marketplace</Link>
            </li>
            <li>
              <Link href="https://medium.com/partage-btc/partages-white-paper-347674063de7">White Paper</Link>
            </li>
            {!session && !loading && (
              <Button link={loginHandler}>
                <span>Login</span>
                <span className={classes.icon}>
                  <UserIcon />
                </span>
              </Button>
            )}
            {session && (
              <li>
                <Link href="/dashboard">User Dashboard</Link>
              </li>
            )}
            {session && (
              <li>
                <Button 
                onClick={logoutHandler}
                >
                  <span>Logout</span>
                  <span className={classes.icon}>
                    <UserIcon />
                  </span>
                </Button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default MainNavigation
