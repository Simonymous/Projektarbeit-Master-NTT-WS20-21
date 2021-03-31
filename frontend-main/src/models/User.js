export default class User {
  constructor (data = null) {
    this.data = data
  }

  isLoggedIn () {
    if (this.data) {
      return true
    } else {
      return false
    }
  }
}
