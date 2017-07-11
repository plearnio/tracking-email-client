import axios from 'axios'

class Tracking {
  constructor({ url, secret }) {
    this.secret = secret
    this.url = url
  }
  passAction(flow, action, userId) {
    axios.post(`${this.url}`, {
      actionName: action,
      flowName: flow,
      user: userId,
      secretToken: this.secret
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
    })
  }
}

module.exports = Tracking
