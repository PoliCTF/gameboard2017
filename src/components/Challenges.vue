<template>
  <div>
    <h1>Challenges</h1>
    <div id="challenges">
          <div v-for="(challs,cat) in challengeList">
            <h2>{{cat}}</h2>
            <ul>
                <li v-for="chall of challs">
                    <router-link :to="{ name: 'Challenge', params: { id: chall.idchallenge }}">{{ chall.name }} - {{chall.points}} pts</router-link>
                </li>
            </ul>
         </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Challenges',
  props: {
    challenges: {
      type: Array,
      required: true
    },
    team: {
      type: Object,
      default: {solves: {}}
    }
  },
  computed: {
      challengeList(){
        let cats = Object.create(null)
        for(let chall of this.challenges){
            cats[chall.cat] = cats[chall.cat] || []
            cats[chall.cat].push(chall)
        }
        return cats
      }
  },
  methods: {
      solved(chall){
          if(this.team.solves[chall.idchallenge]){
              return true
          }
      }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
