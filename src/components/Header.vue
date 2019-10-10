<template>
  <nav class="navbar is-warning is-small" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <router-link class="navbar-item" to="/">
      <h1 class="title">Radio</h1>
    </router-link>

    <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-end">
      <router-link class="navbar-item" to="/">
        Home
      </router-link>

      <router-link class="navbar-item" to="/upload">
        Upload
      </router-link>

      <router-link class="navbar-item" to="/about">
        About
      </router-link>
    </div>
  </div>
</nav>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style>

</style>
