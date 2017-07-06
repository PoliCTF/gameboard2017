<template>
    <div data-toggle="tooltip" @mouseover="tooltipOn" @mouseleave="tooltipOff">
        <a href="#" v-on:click.prevent="$emit('refresh')" >refresh</a>
    </div>
</template>

<script>

import Spinner from 'vue-simple-spinner'

import Shared from '@/Shared'

function timeSince(date) {
  var seconds = Math.floor((new Date() - date) / 1000);
  var interval = Math.floor(seconds / 31536000);
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}

export default {
  name: 'RefreshButton',
  props: {
      lastUpdate: {type: Date},
      refreshing: {type: Boolean}
  },
  components: {
      Spinner
  },
  mounted(){
    $(this.$el).tooltip({title: "Click to refresh" , placement:'bottom'}).show()
  },
  methods: {
    submitRefresh(){
        this.$emit('refresh')
    },
    tooltipOn() {
        $(this.$el).attr("data-original-title", "refreshed " + timeSince(this.lastUpdate) + "ago").show()
    },
    tooltipOff(){
        
    }
  },
  computed: {
      title(){
         return 
      }
  }
}
</script>


<style>

</style>
