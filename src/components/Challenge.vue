<template>
  <div class="challenge-details">
    <div v-if="error" class="error">
      Error: {{error}}
    </div>
    <div v-if="challenge">
      <h1>{{challenge.name}}</h1>
      <h3 class="subheader">{{challenge.category}} - {{challenge.points}}pts</h3>
      <div class="chall-desc" v-html="challenge.html"></div>
      <Conversation></Conversation>
    </div>    
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
  data () { return {
    challenge: null,
    error: null
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
.chall-desc{text-align: center; margin-bottom: 2em}
</style>
