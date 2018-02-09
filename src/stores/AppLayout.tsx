import { extendObservable } from 'mobx'

class AppLayoutStore {
  constructor() {
    extendObservable(this, {
      isAuthenticated: false
    })
  }
}

export default AppLayoutStore
