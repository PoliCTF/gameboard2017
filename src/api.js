const baseurl = window.baseurl || '/api/'
import axios from 'axios'
import qs from 'qs'

axios.defaults.baseURL = baseurl

/* Let's define a specific exception type for login errors -> when those are thrown, log out the user */
function LoginError(message) {
  this.name = 'LoginError';
  this.message = message || null;
  this.stack = (new Error()).stack;
}
LoginError.prototype = Object.create(Error.prototype);
LoginError.prototype.constructor = LoginError;


export default {
  getCommonState () {
    return axios.all([
      axios.get('common/status'),
      axios.get('common/challenges')
    ]).then(axios.spread(function (status, challenges) {
      let state = {
        challenges: null,
        leaderboard: status.data.scores
      }

      state.warnings = status.data.globalwarnings.map(function (warning) {
        return {
          message: warning.message,
          time: new Date(warning.unixtime * 1000),
          type: 'global'
        }
      })

      state.challenges = status.data.status.filter(c => {
        return c.status == "open" && challenges.data[c.idchallenge];
      }).map(challenge => {
        let details = challenges.data[challenge.idchallenge];
        challenge.name = details.name;
        challenge.cat = details.cat;
        return challenge;
      })

      return state
    }))
  },

  getTeamState () {
    return axios.get('/team/status', {withCredentials: true}).then(function (teamstatus) {
      if (teamstatus.data.status === 'Plz login.') {
        throw new LoginError('Please login.');
      }

      teamstatus.data.statosquadra.solved = teamstatus.data.solved  || [];

      teamstatus.data.statosquadra.warnings = (teamstatus.data.teamwarnings || []).map(function(warning) {
          return {
              message : warning.message,
              time : new Date(warning.unixtime * 1000),
              type: 'team'
          }
      }) || [];

      return teamstatus.data.statosquadra;
    })
  },

  getChallenge (id) {
    return axios
      .get('/common/challenge/' + id)
      .then(response => {
        if (response.data.html === 'Error') {
          throw new Error('not_found')
        }
        return response.data
      })
  },

  submitFlag (flag) {
    let errmsgs = {
      'wrong': 'Wrong flag, sorry',
      'rightbutcannotsave': 'Right flag but I can\'t save it right now, try again',
      'slowdown': 'Rate limiting reached, slow down please',
      'alreadysolved': 'Your team already solved this challenge! Go pwn something else!'
    }
    return axios
      .post('/team/submit', qs.stringify({flag: flag}), {withCredentials: true})
      .then(ret => {
        let res = ret.data.result
        if (!Number.isInteger(res)) {
          throw new Error(errmsgs[res])
        }
        return ret.data
      })
  },

  login (username, password) {
    let logindata = qs.stringify({teamname: username, password: password})
    return axios
      .post('/login', logindata, {withCredentials: true})
      .then(function (result) {
        if (result.data.r !== 1) {
          throw new LoginError(result.data.reason);
        }
        return true
      })
  },

  logout () {
    return axios
      .post('/logout', {}, {withCredentials: true})
      .then(function (result) {
        if (result.data.status === 'Plz login.') {
          throw new LoginError('Logout successful.');
        }
        if (result.data.r !== 1) {
          throw new Error('logout_failed')
        }
        return true
      })
  }
}
