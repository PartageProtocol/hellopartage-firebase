import { Fragment, useContext } from 'react'

import MainNavigation from './main-navigation'
import Notification from '../ui/notification'
import NotificationContext from '../../store/notification-context'
import Footer from 'components/app/footer'

function Layout(props) {
  const notificationCtx = useContext(NotificationContext)

  const activeNotification = notificationCtx.notification

  return (
    <Fragment>
      <MainNavigation />
      <>{props.children}</>
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
      <Footer />
    </Fragment>
  )
}

export default Layout
