<template>
  <div id="app">
    <nav class="navbar navbar-toggleable-md navbar-inverse bg-inverse" >
      <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#mainNavbar" aria-controls="mainNavbar" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <a class="navbar-brand" href="#"><span class="logo-draw">\&gt; </span><span class="logo-poli">poli</span><span class="logo-ctf">ctf</span></a>

      <div class="collapse navbar-collapse" id="mainNavbar">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link to="/" class="nav-link" exact>Challenges</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/leaderboard" class="nav-link">Leaderboard</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/about" class="nav-link">About</router-link>
          </li>
          <li class="nav-item" id="registration-link">
            <a href="https://register.polictf.it" class="nav-link">Register</a>
          </li>
        </ul>
        <ul class="navbar-nav my-2 my-lg-0" v-if="team">
          <li class="nav-link">{{team.nome}} - {{team.totpoints}} pts </li>
          <li class="nav-link"> <a href="#" v-on:click.prevent="logout">logout</a></li>
          <li class="nav-link"> <a href="#" v-on:click.prevent="fetchData">refresh</a></li>
        </ul>
      </div> 
    </nav>

    <div class="container">
      <div v-if="error" class="alert alert-danger" role="alert">
          {{error}}
          <button v-on:click="error = null" type="button" class="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
      </div>
      <div v-if="message" class="alert alert-info" role="alert">
          {{message}}
          <button v-on:click="message = null" type="button" class="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
      </div>
      <section id="main-content">
          <div v-if="logged_in">
            <transition name="slide-fade" mode="out-in">
              <router-view 
                v-if="challenges.length > 0 && leaderboard"
                :challenges="challenges"
                :leaderboard="leaderboard"
                :team="team"
                :warnings="warnings"
                ></router-view>
            </transition>
          </div>
          <div v-else>
            <Login v-on:submit="onLoginSubmitted" />
          </div>
      </section>
    </div>

    <footer class="footer">
      <div class="text-muted">
        <p>Competition organized by <a href="http://toh.necst.it">Tower of Hanoi</a> and supported by the <a href="http://www.necst.it">NECSTLab</a>.<br/>
          <i class="fa fa-twitter" aria-hidden="true"></i> <a href="https://twitter.com/towerofhanoi">towerofhanoi</a>&nbsp;&bull;
          <i class="fa fa-github" aria-hidden="true"></i> <a href="https://github.com/polictf">polictf</a>&nbsp;&bull;
          <i class="fa fa-envelope" aria-hidden="true"></i> <a href="mailto:info@polictf.it">info@polictf.it</a>&nbsp;&bull;
          <i class="fa fa-comment" aria-hidden="true"></i> <a href="https://webirc.hackint.org/#polictf">#polictf on hackint</a>
        </p>
      </div>
    </footer>

  </div>
</template>

<script>
  import Api from './api'
  import Login from './components/Login'
  import Bus from '@/Bus'

  let App = {
    name: 'app',

    components: {
      Login
    },

    created(){
      if(window.localStorage.getItem('loggedin')){
        this.logged_in = true
      }
      Bus.$on('submitflag', this.submitFlag)
    },

    watch: {
      logged_in: function(logged_in){
        if(logged_in){
          window.localStorage.setItem('loggedin', true)
          this.fetchData();
          $('#registration-link').hide();
        } else {
          this.team = null
          this.error = null
          window.localStorage.removeItem('loggedin')
          $('#registration-link').show();
        }
      }
    },

    data: function () {
      return {
        logged_in: false,
        team: null,
        message: null,
        error: null,
        challenges: [],
        warnings: [],
        leaderboard: [],
        lastUpdate: null,
        flag: null
      }
    },

    methods: {
      fetchData(){
        Api.getTeamState()
          .then(team => this.team = team)
          .catch(e => this.handleErrors(e))
          .then(() => Api.getCommonState())
          .then( commonState => {
            this.challenges = commonState.challenges
            this.warnings = commonState.warnings
            this.leaderboard = commonState.leaderboard
            
            for (let chall of this.challenges){
              chall.solved = !!this.team.solved.find(x=> x.id == chall.idchallenge)
            }
          })
          .catch((e) => this.handleErrors(e))
          .then(() => this.lastUpdate = new Date())
      },

      handleErrors(e){
        if(e.name === 'LoginError') {
          this.logged_in = false
          this.message = null
          this.error = e.message || "Please login."
        } else {
          this.error = e.message
        }
      },

      onLoginSubmitted(username, password){
        Api
          .login(username,password)
          .then(() => {
            this.logged_in = true
            this.message = null
            this.error = null
          })
          .catch(e => this.handleErrors(e))
      },

      submitFlag(flag){
        if(!flag){
          this.error = "Please insert a flag"
          return;
        }
        Api
          .submitFlag(flag)
          .then(() => this.message = "Flag submitted succesfully")
          .then(() => this.fetchData())
          .catch(e => this.handleErrors(e))
      },

      logout(){
        Api
          .logout()
          .then(() => {
            this.logged_in = false
            this.message = "Logged out"
          })
          .catch(e => this.handleErrors(e))
      }
    }

  } //end app

  export default App;

</script>

<style>

  @import url("https://fonts.googleapis.com/css?family=Source+Code+Pro|Source+Sans+Pro:300,400,900");

  #app {
    font-family: "Source Sans Pro", Arial, Helvetica, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #eaeaea;
  }

  body {
        background: #151515 url("assets/bkg.png") 0 0;
  }
  .container {
    margin-top: 60px;
    margin-bottom: 60px;
  }

  .footer {
    text-align: center;
  }

  #main-content h1 {
    text-align: center;
  }

  .slide-fade-enter-active, .slide-fade-leave-active  {
    transition: opacity .2s ease;;
  }

  .slide-fade-enter,
  .slide-fade-leave-to {
    opacity: 0;
  }

  .logo-draw {
    font-weight: 900;
    color: #9abbff;
  }

  .logo-poli {
    font-weight: 400;
    color: #ffffff;
  }

  .logo-ctf {
    font-weight: 400;
    color: #9abbff;
  }

  .navbar-brand {
    font-size: 1.7em;
  }

  a {
    color: #9abbff;
  }

  #mainNavbar a {
    outline:none;
  }

  #mainNavbar .router-link-active {
    color: rgba(255, 255, 255, 0.75);
  }

</style>
