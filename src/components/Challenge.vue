<template>
  <div class="challenge-details">
    <transition>
    <div v-if="error" class="error">
      Error: {{error}}
    </div>
    <div v-if="challenge">
      <h1>{{challenge.name}}</h1>
      <h3 class="subheader">{{challenge.category}} - {{challenge.points}}pts</h3>
      <div class="contain">
        <div class="row">
          <div class="chall-desc col-6" >
            <h2>Case Notes <img src="../assets/notesc.png" width="120px" /></h2>
            <div v-html="challenge.html"></div>
          </div>
          <div class="col-6 interrogations">
            <div v-if="interrogating">
              <h2>Interrogating Guy</h2>
              <Conversation></Conversation> 
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
    }
  },
  created(){
    this.fetchData()
  },
  data() { return {
    challenge: null,
    error: null,
     interrogating: false
  }},
  watch: {
    id: function(){
      this.fetchData()
    }
  },
  methods: {
    fetchData () {
      Api
        .getChallenge(this.id)
        .then(challenge => {
          this.error = null
          this.challenge = challenge
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
.subheader{text-align: center; margin-bottom: 2em}
.chall-desc{margin-bottom: 2em}
.interrogations{text-align: center; min-height: 500px;}
.image{width:80%}
</style>
