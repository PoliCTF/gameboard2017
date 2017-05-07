<template>
  <div class="conversation">
    <div v-for="(line,i) of visible_lines">
      <p class="other" v-if="isString(line)">{{line}}</p>
      <div v-else-if="choices[i]">
        <p class="me text-primary">{{choices[i]}}</p>
        <p class="other">{{ line[choices[i]] }}</p>
      </div>
      <div v-else>
        <p class="me choice">
            <a v-for="(rr, r) in line" v-on:click="$set(choices,i, r)" class="btn btn-outline-primary" role="button">{{r}}</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>

let conversation = {
  avatar : "img",
  lines: [ 
    "Hi I'm Remmy Mc.Nee, I have a job for you. Do you like squirrels, right?",
    {
      "Yes?": "Great! That's good news. There are tons of them in here, everywhere",
      "What?": "There are squirrels everywhere in here. Look, I need your help"
    },
    "We had an uprising in our chocolate factory yesterday, and our worker squirrels took charge of the whole plant. They're frankly also doing a good job",
    {
      "Is it even legal to employ squirrels?": "Everyone knows squirrels make the best chocolate",
    },
    "We need the combination of the plant's main door, so we can get in and restore the situation. Unfortunately the only way to access to the plant's computer is through the chocolate order system. Fortunately it's very buggy",
    {"...": "..."},
    "Listen, just connect to tcp: chocolateFactory.polictf.it:8089. Here's a copy of the binary: http://polictf.it/bins/chocolateFactory"
  ]
}

import Api from '@/api'

export default {
  name: "Conversation",
  data: () => { return {
    conversation: conversation, //TODO make prop
    choices: [null, null, null, null, null, null, null, null]
  }},
  computed: {
    visible_lines() {
        let visilines = []
        let i = 0
        for(let line of this.conversation.lines){
            if(typeof(line) == "string"){
                visilines.push(line)
                i++
            } else {
                visilines.push(line)
                if(!this.choices[i]) break
                i++
            }
        }
        return visilines
    }
  },
  methods: {
    isString(s){
        return typeof(s) == "string"
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.subheader{text-align: center; margin-bottom: 2em}
.chall-desc{text-align: center;}
</style>
