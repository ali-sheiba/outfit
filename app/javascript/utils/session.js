import jwtDecode from 'jwt-decode';

class Session {
  accessToken = null;

  tokenKey = 'accessToken';

  constructor() {
    this.loadAccessToken();
  }

  loadAccessToken() {
    if (sessionStorage.getItem(this.tokenKey)) {
      try {
        this.accessToken = sessionStorage.getItem(this.tokenKey);
        return this.accessToken;
      } catch (error) {
        this.accessToken = null;
        return false;
      }
    }

    this.accessToken = null;
    return false;
  }

  isLogin() {
    return this.loadAccessToken() && this.accessToken !== null && this.isValidToken();
  }

  isValidToken() {
    try {
      if (this.loadAccessToken() && jwtDecode(this.accessToken)) {
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  getAccessToken() {
    return this.isLogin() && this.accessToken;
  }

  setAccessToken(token) {
    this.accessToken = token;
    sessionStorage.setItem(this.tokenKey, token);
    return true;
  }

  clearAccessToken() {
    this.accessToken = null;
    sessionStorage.removeItem(this.tokenKey);
    return true;
  }

  getBearerToken() {
    return this.isLogin() ? `Bearer ${this.accessToken}` : null;
  }

  getUser() {
    if (this.isLogin()) {
      return jwtDecode(this.accessToken);
    }
    return null;
  }
}

export default new Session();
