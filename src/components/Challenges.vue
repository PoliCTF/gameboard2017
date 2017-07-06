<template>
  <div class="container">
    <div v-if="shared.lastUpdate">
      <div class="row">
        <div id="challenges" class="col-8">
          <h1 style="text-align: center;">My Cases <img src="../assets/investigationcw.png" width="90px"> </h1>
              <div v-for="(challs,cat) in challengeList" class="chall-list container">
                <div class="row">
                  <h2>{{cat}}</h2>
                </div>
                <div class="chall-cat row">
                    <div v-for="chall of challs">
                        <router-link :to="{ name: 'Challenge', params: { id: chall.idchallenge }}" class="challenge" v-bind:class="{ solved : chall.solved, firstblood: chall.numsolved == 0 }">
                          {{ chall.name }} ({{chall.points}})
                          <span v-if="chall.solved" class="badge">solved</span>
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
    <div v-else>
      <spinner size="big" message="Loading..." text-fg-color="#9abbff" line-fg-color="#9abbff"></spinner>
    </div>
  </div>
</template>

<script>
import FlagForm from './FlagForm'
import Spinner from 'vue-simple-spinner'
import Shared from '@/Shared'

export default {
  name: 'Challenges',
  components: {
    FlagForm, Spinner
  },
  data: function(){
    return {
      shared: Shared.data
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
.chall-list:not(first){
  margin-top: 0.5em;
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
a.challenge:hover{
  background-color: rgba(255,255,255,0.1);
  color:#9abbff;
  text-decoration:none;
}

.firstblood {
    border: 1px solid #9abbff;
}

.solved {
    background-color: rgba(255,255,255,0.03);
    color: #eaeaea;
}

.chall_solved_indicator, .chall_solved_indicator:hover {
  color:#eaeaea;
}
</style>
