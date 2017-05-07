<template>
  <div class="login">
    <h1>Login</h1>
    <form v-on:submit.prevent="onSubmit()">
        <label for="username">Username <input class="form-control" name="username" v-model="username" type="text"></label><br/>
        <label for="password">Password <input class="form-control" name="password" v-model="password" type="password"></label><br/>
        <input value="Login" type="submit" class="btn btn-primary"></input>
    </form>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    onSubmit() {
        this.$emit("submit", this.username, this.password);
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login {
    text-align: center;
}
</style>
