<template>
  <div class="challenge-details">
    <transition name="fade">
    <div v-if="error" class="error">
      Error: {{error}}
    </div>
    <div v-if="challenge">
      <h1>{{challenge.name}}</h1>
      <h3 class="subheader">{{challenge.category}} - {{challenge.points}}pts - {{solves}}</h3>
      <div class="contain">
        <div class="row">
          <div class="chall-desc col-6" >
            <h2>Case Notes <img src="../assets/notescw.png" width="90px" /></h2>
            <div v-html="challenge.html"></div>
          </div>
          <div class="col-6 interrogations">
            <div v-if="interrogating">
              <Conversation :conversation="challenge.conversation"></Conversation> 
            </div>
            <div v-else>
              <h2>Interrogations!</h2>
              <a href="#" v-on:click.prevent="interrogating=true">
                <img src="../assets/questioningc.png" class="image" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>    
  </transition>
  </div>
</template>

<script>
import Api from '@/api'
import Conversation from '@/components/Conversation'

export default {
  name: 'Challenge',
  components: {
    Conversation
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
    }
  },
  created(){
    this.fetchData()
  },
  data() { return {
    challenge: null,
    error: null,
    interrogating: true
  }},
  watch: {
    id: function(){
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
            console.error("this.challenges not loaded");
          }

          let challdata = this.challenges.find(x => x.idchallenge == id)

          this.challenge = challenge
          this.challenge.numsolved = challdata.numsolved
          this.challenge.points = challdata.points
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
