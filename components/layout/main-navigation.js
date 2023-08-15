import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useState, useEffect } from 'react'
import styles from './main-navigation.module.css'
import BurgerIcon from 'components/icons/burger-icon'

import { AppConfig, UserSession } from '@stacks/connect'
import { connectWallet } from '../../helpers/utils'

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

  const loginHandler = () => {
    return '/auth'
  }
  const logoutHandler = () => {
    signOut()
  }

  return (
    <header className="container">
      <div className={styles.header}>
        <Link href="/">
          <div className={styles.logo}>Partage</div>
        </Link>

        <nav className={styles.nav}>
          <div className={styles.nav__icon}>
            <BurgerIcon />
          </div>

          <ul className={styles.nav__menu}>
            <li>
              <Link href="/nfts">Marketplace</Link>
            </li>
            <li>
              <Link href="https://medium.com/partage-btc">White Paper</Link>
            </li>
            {loggedIn ? (
              <li
                onClick={() => {
                  setLoggedIn(false)
                  localStorage.clear()
                }}
              >
                Disconnect Wallet
              </li>
            ) : (
              <li onClick={() => connectWallet(userSession)}>Connect Wallet</li>
            )}
            {!session && !loading && (
              <a href="/auth">
                <button>Login</button>
              </a>
            )}
            {session && (
              <li>
                <Link href="/profile">User Dashboard</Link>
              </li>
            )}
            {session && (
              <li>
                <Link href="/connect-wallet">Connect Wallet</Link>
              </li>
            )}
            {session && (
              <li>
                <button onClick={logoutHandler}>Logout</button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default MainNavigation
