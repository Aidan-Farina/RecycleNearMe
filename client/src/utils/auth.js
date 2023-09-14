import decode from 'jwt-decode';

const TOKEN_KEY = 'id_token';

class AuthService {
  getProfile() {
    const token = this.getToken();
    console.log("Retrieved token:", token);
    if (!token) {
      console.log("No token found");
      return null;
    }

    try {
      const profile = decode(token);
      console.log("Decoded profile:", profile);
      return profile;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  loggedIn() {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    
    try {
      if (this.isTokenExpired(token)) {
        this.clearToken();
        return false;
      } else {
        return true;
      }
    } catch (error) {
      console.error('Error validating token:', error);
      this.clearToken();
      return false;
    }
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error decoding expiration from token:', error);
      return true;
    }
  }

  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  }

  clearToken() {
    localStorage.removeItem(TOKEN_KEY);
  }

  login(idToken) {
    localStorage.setItem(TOKEN_KEY, idToken);
    window.location.assign('/');
  }

  logout() {
    try {
      this.clearToken();
      window.location.reload();
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }
}

export default new AuthService();
