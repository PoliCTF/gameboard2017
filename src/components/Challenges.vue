<template>
  <div class="container">
    
      <div class="row">
        <div id="challenges" class="col-7">
          <h2>My Cases <img src="../assets/investigationcw.png" width="90px"> </h2>
              <div v-for="(challs,cat) in challengeList" class="chall-list container">
                <div class="row">
                  <h2>{{cat}}</h2>
                </div>
                <div class="chall-cat row">
                    <div v-for="chall of challs">
                        <router-link :to="{ name: 'Challenge', params: { id: chall.idchallenge }}" class="challenge">
                          {{ chall.name }} <br> {{chall.points}} pts
                        </router-link>
                    </div>
                    <div v-for="chall of challs">
                        <router-link :to="{ name: 'Challenge', params: { id: chall.idchallenge }}" class="challenge">
                          {{ chall.name }} <br> {{chall.points}} pts
                        </router-link>
                    </div>
                    <div v-for="chall of challs">
                        <router-link :to="{ name: 'Challenge', params: { id: chall.idchallenge }}" class="challenge">
                          {{ chall.name }} <br> {{chall.points}} pts
                        </router-link>
                    </div>
                    <div v-for="chall of challs">
                        <router-link :to="{ name: 'Challenge', params: { id: chall.idchallenge }}" class="challenge">
                          {{ chall.name }} <br> {{chall.points}} pts
                        </router-link>
                    </div>
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
</template>

<script>
import FlagForm from './FlagForm'

export default {
  name: 'Challenges',
  components: {
    FlagForm
  },
  data: function(){
    return {
      flag: null
    }
  },
  props: {
    challenges: {
      type: Array,
      required: true
    },
    team: {
      type: Object,
      default: {solves: {}}
    },
    warnings: {
      type: Array,
      default: []
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
.chall-list, .warnings {
  margin-top: 2em;
}
.chall-list h2 {
  text-transform: capitalize;
}
.challenge {
  display: block;
  padding: 1em;
  border: 1px solid grey;
  width: 12em;
  margin-right: 0.2em;
  margin-bottom: 0.3em;
}
</style>
