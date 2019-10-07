<template>
  <div id="app">
    <notifications group="all" position="top center"/>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/upload">Upload</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>
