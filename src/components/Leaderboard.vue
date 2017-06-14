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
               <td>{{team.name}}</td>
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
