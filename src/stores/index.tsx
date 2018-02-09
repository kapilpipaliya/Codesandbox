import SessionStore from './SessionStore'
import ShowsStore from './ShowsStore'
import GridLayoutStore from './GridLayoutStore'
import NotificationStore from './NotificationStore'
import ImageStore from './ImageStore'
import ConstrainsStore from './ConstrainsStore'

export default function createStores() {
  return {
    SessionStore: new SessionStore(),
    ShowsStore: new ShowsStore(),
    GridLayoutStore: new GridLayoutStore(),
    NotificationStore: new NotificationStore(),
    ImageStore: new ImageStore(),
    ConstrainsStore: new ConstrainsStore(),
  }
}