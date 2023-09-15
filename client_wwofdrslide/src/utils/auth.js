// use this to decode a token and get the user's information out of it
import decode from 'jwt-decode';

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

  // // check if token is expired
  // isTokenExpired(token) {
  //   try {
  //     const decoded = decode(token);
  //     if (decoded.exp < Date.now() / 1000) {
  //       return true;
  //     } else return false;
  //   } catch (err) {
  //     console.log('Token invalid or expired: ', err)
  //     return true;
  //   }
  // }

  // getToken() {
  //   const name = 'auth_token=';
  //   const decodedCookie = decodeURIComponent(document.cookie);
  //   const ca = decodedCookie.split(';');
  //   for (let i = 0; i < ca.length; i++) {
  //     let c = ca[i];
  //     while (c.charAt(0) === ' ') {
  //       c = c.substring(1);
  //     }
  //     if (c.indexOf(name) === 0) {
  //       return c.substring(name.length, c.length);
  //     }
  //   }
  //   return null;
  // }

  login(callback) {
    // Saves user token to localStorage
    // localStorage.setItem('id_token', idToken);
    // window.location.assign('/');
    // if (!this.isTokenExpired(idToken)) {
      const profile = this.getProfile();
      if (profile) {
        if (callback) {
          callback(profile);
        }
      } else {
        console.log('no profile');
      }
    }

    //   if (callback && this.loggedIn()) {
    //     callback();
    //   }
    // }
  // }

  logout() {
    // Clear user token and profile data from localStorage
    // localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    // this will reload the page and reset the state of the application
    // window.location.assign('/');
  }
}

export default new AuthService();
