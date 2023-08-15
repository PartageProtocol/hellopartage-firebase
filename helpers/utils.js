import { showConnect } from '@stacks/connect'

export function connectWallet(userSession) {
  showConnect({
    appDetails: {
      name: 'Partage',
      icon: 'https://assets.website-files.com/618b0aafa4afde65f2fe38fe/618b0aafa4afde2ae1fe3a1f_icon-isotipo.svg',
    },
    redirectTo: '/',
    onFinish: () => {
      window.location.reload()
    },
    userSession,
  })
}
