const baseurl = window.location.protocol + '//' + window.location.hostname + ':8089/scoreboard/'
import axios from 'axios'
import qs from 'qs'

axios.defaults.baseURL = baseurl


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
          time: new Date(warning.unixtime * 1000)
        }
      })

      state.challenges = status.data.status.map(challenge => {
        let details = challenges.data[challenge.idchallenge]
        challenge.name = details.name
        challenge.cat = details.cat
        return challenge
      })

      return state
    }))
  },

  getTeamState () {
    return axios.get('/team/status', {withCredentials: true}).then(function (teamstatus) {
      if (teamstatus.data.status === 'Plz login.') {
        throw new Error('login')
      }

      return teamstatus.data.statosquadra
    })
  },

  getChallenge (id) {
    return axios
      .get('/common/challenge/' + id)
      .then(response => {
        if (response.data.html === 'Error') {
          throw new Error('not_found')
        }
        
        try {
          response.data.conversation = JSON.parse(response.data.metadata)
        } catch (e) {
          console.error(e)
        }

        return response.data
      })
  },

  submitFlag (flag) {
    let errmsgs = {
      'wrong': 'Wrong flag, sorry',
      'rightbutcannotsave': 'Right flag but I can\'t save it right now, try again',
      'slowdown': 'Rate limiting reached, slow down please'
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
          throw new Error('credentials')
        }
        return true
      })
  },

  logout () {
    return axios
      .post('/logout', {}, {withCredentials: true})
      .then(function (result) {
        if (result.data.status === 'Plz login.') {
          throw new Error('login')
        }
        if (result.data.r !== 1) {
          throw new Error('logout_failed')
        }
        return true
      })
  }
}
