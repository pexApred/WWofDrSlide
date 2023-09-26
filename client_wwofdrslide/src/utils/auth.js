// create a new class to instantiate for a user
class AuthService {
  // get user data
  getProfile() {
    const profile = localStorage.getItem('profile');
    return profile ? JSON.parse(profile) : null;
  }

  // check if user's logged in
  loggedIn() {
    // Checks if there is a saved token and it's still valid
    return !!this.getProfile; // handwaiving here
  }

  login(callback) {
      const profile = this.getProfile();
      if (profile) {
        if (callback) {
          callback(profile);
        }
      } else {
        console.log('no profile');
      }
    }

  logout() {
    // Clear user token and profile data from localStorage
    // localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    // this will reload the page and reset the state of the application
    // window.location.assign('/');
  }
}

export default new AuthService();
