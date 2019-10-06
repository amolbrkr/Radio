<template>
  <div>
    <h3>Account Info: </h3>
    <br/>
    {{ accInfo }}
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'AccountInfo',
  data () {
    return {
      accInfo: null
    }
  },

  mounted () {
    axios.get('https://api.openload.co/1/account/info?login=98fad8486c4f8310&key=oXQWoeUf')
      .then(res => (this.accInfo = res))
  }
}
</script>
