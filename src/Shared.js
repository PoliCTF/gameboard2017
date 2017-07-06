import Vue from 'vue'
export default {
  data: {
    logged_in: false,
    team: null,
    message: null,
    error: null,
    challenges: [],
    warnings: [],
    leaderboard: [],
    lastUpdate: null,
    flag: null,
    refreshing: false
  },
  events: new Vue()
}
