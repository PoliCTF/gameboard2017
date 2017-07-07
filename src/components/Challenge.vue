<template>
  <div class="container" v-if="challenge && challenges.length > 0">
      <div class="row">
        <div id="challenges-details" class="col-8">
          <transition name="fade">
            <div v-if="error" class="error">
              Error: {{error}}
            </div>
          </transition>

          <h1 style="text-align: center;  ">{{challenge.name}}</h1>
          <h3 class="subheader">{{challenge.category}} &middot; {{challenge.points}}pts &middot; {{solves}}</h3>
          <h3 class="subheader" v-if="challenge.solved">Solved!</h3>

          <div class="chall-desc" >
            <h2 style="padding-bottom: 0.3em;">Case Notes <img src="../assets/notescw.png" width="90px" /></h2>
            <div v-html="challenge.html"></div>
            <div v-if="challenge.file">
                <p class="lead">Download the challenge <a :href="challenge.file">here</a>! <br/><small>(SHA 256 checksum: {{challenge.filehash}})</small></p>
            </div>
          </div>
        </div>
      <div id="sidebar" class="col">
        <h2>Solve a case!</h2>
        <FlagForm />
        <div class="warnings">
          <h3>Secretary notes</h3>
          <table class="table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="warning of warnings">
                <td>{{warning.time.toLocaleString()}}</td>
                <td>{{warning.message}}</td>
              </tr>
            </tbody>
          </table>

          </ul>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <spinner size="big" message="Loading..." text-fg-color="#9abbff" line-fg-color="#9abbff"></spinner>
  </div>
</template>

<script>
import Api from '@/api'
import FlagForm from './FlagForm'
import Spinner from 'vue-simple-spinner'

export default {
  name: 'Challenge',
  components: {
    FlagForm, 
    Spinner
  },
  props: {
    id: {
      type: Number,
      required: true
    },
    challenges: { 
      //Array with all the challenges, this component will search it for the 
      //challenge with the given id.
      type: Array,
      required: true
    },
    warnings: {
      type: Array,
      default: []
    }
  },
  created(){
    this.fetchData();
  },
  data() { return {
    challenge: null,
    error: null,
    interrogating: true
  }},
  watch: {
    id: function(){
      this.fetchData()
    },
    challenges: function(){
      this.fetchData()
    }
  },
  computed: {
    solves: function(){
      return this.challenge ? "" + this.challenge.numsolved + " solves" : ""
    }
  },
  methods: {
    fetchData () {
      let id = this.id
      Api
        .getChallenge(id)
        .then(challenge => {
          this.error = null

          // horrible horrible hack. We take the number of solves and points 
          // from commonstatus

          if(this.challenges.length == 0){
            console.log("this.challenges not loaded. Trying later");
            return;
          }

          let challdata = this.challenges.find(x => x.idchallenge == id)

          this.challenge = challenge
          this.challenge.numsolved = challdata.numsolved || 0
          this.challenge.points = challdata.points
          this.challenge.solved = challdata.solved

        })
        .catch(e => {
          console.log(e)
          this.challenge = null
          if(e.message === 'not_found'){
            this.error = 'Challenge not found'
          }
        })
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.challenge-details { min-height: 600px;}
.subheader{text-align: center; margin-bottom: 2em}
.chall-desc{margin-bottom: 2em}
.interrogations{text-align: center; min-height: 500px;}
.image{width:80%}

.fade-enter-active, .fade-leave-active  {
    transition: opacity .2s ease;;
  }

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
