<template>
  <div id="app">
    <notifications group="all" position="top left"/>
    <!--<div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/upload">Upload</router-link> |
      <router-link to="/about">About</router-link>
    </div>-->
    <Header />
    <router-view/>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'

export default {
  components: {
    Header,
  }
}
</script>
