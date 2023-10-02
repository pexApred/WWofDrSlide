class AuthService {
  // check if user's logged in
  loggedIn() {
    // Checks if there is a saved token and it's still valid
    return !!this.userData; // handwaiving here
  }

  login() {
    // if (callback) {
    //   callback();
    // }
  }

  logout() {
    // this will reload the page and reset the state of the application
    window.location.assign('/');
  }
}

export default new AuthService();
