<template>
  <div>
    <h1>Leaderboard <img src="../assets/podiumcw.png" width="120px"/></h1>
    <table id="leaderboard" class="table">
        <thead>
            <tr>
                <th>Ranking</th>
                <th>Team</th>
                <th>Country</th>
                <th>Score</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(team, index)  in leaderboard">
               <td>#{{index +1}}</td>
               <td><a :href="team.website ? team.website : null" target="_blank">{{team.name}}</a><span v-if="team.twitter">&nbsp;&nbsp;&nbsp;&nbsp;<small><i class="fa fa-twitter" aria-hidden="true"></i>&nbsp;<a :href="'https://twitter.com/' + team.twitter" target="_blank">{{team.twitter}}</a></small></span></td>
               <td>{{team.country}}</td>
               <td>{{team.points}}</td>
            </tr>
        </tbody>

    </table>
  </div>
</template>

<script>
export default {
  name: 'Leaderboard',
  props: {
    leaderboard: {
      type: Array,
      required: true
    }
  },
  methods: {
  }
}
</script>


<style scoped>
</style>
