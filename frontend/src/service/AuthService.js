import axios from "axios";
import { registerRoute, loginRoute } from '../service/API';


class AuthService {
  login(email, password) {
    return axios.post(loginRoute, {
        email,
        password
      })
      .then(response => {
        if(response.data.status) {
          localStorage.setItem(process.env.REACT_APP_LOCALHOST_KEY, JSON.stringify(response.data));
        }
        return response;
      });
  }

  logout() {
    localStorage.removeItem(process.env.REACT_APP_LOCALHOST_KEY);
  }

  register(username, email, password) {
    return axios.post(registerRoute, {
      username,
      email,
      password
    })
    .then(response => {
      return response;
    })
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));;
  }
}
export default new AuthService();
