<template>
    <form v-on:submit.prevent="submitFlag(flag)" class="form-inline" autocomplete="off">
        <div class="input-group">
            <input class="form-control" name="flag" v-model="flag" type="text" placeholder="Flag">
            <span class="input-group-btn">  
                <input type="submit" class="btn btn-secondary flag-submit-button" value="Submit"></input>  
            </span>
        </div>
    </form>
</template>

<script>
import Bus from '@/Bus'

export default {
  name: 'FlagForm',
  data: function(){
      return {
          flag: null
      }
  },
  methods: {
    submitFlag(flag){
        this.$emit('submitflag', flag)
        Bus.$emit('submitflag', flag)
        this.flag = null
    }
  }
}
</script>


<style scoped>
.flag-submit-button {
    background-color: #eaeaea;
}
</style>
