import { extendObservable, runInAction, observable, action } from 'mobx'

class NotificationStore {
  constructor() {
    extendObservable(this, {
      flashMessage: {error: false, notice: false, type: '', text: ''}
    })
  }
  @action.bound
  deleteFlashMessage() {
    runInAction(() => {
     this.flashMessage = {error: false, notice: false, type: '', text: ''}
    })
  }
  @action.bound
  error(n) {
    const flashMessage = this.flashMessage;
    runInAction(() => {
     flashMessage.error= true
     flashMessage.type= 'error',
     flashMessage.text= n
    })
  }
  @action.bound
  notice(n) {
    const flashMessage = this.flashMessage;
    runInAction(() => {
      flashMessage.notice= true
      flashMessage.type= 'notice'
      flashMessage.text= n
    })
  }

}

export default NotificationStore
