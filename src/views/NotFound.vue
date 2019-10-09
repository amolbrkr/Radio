<template>
  <div class="not-found">
    <div class="not-found-art">
      <img src="../assets/not-found.svg" width="200" height="auto" alt="404 Not Found">
    </div>
    <h1>
      Oops! Something went wrong.
    </h1>
    <h4>
      We can't find what you're looking for :(
    </h4>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>

<style>
  .not-found {
    display: block;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    margin: 10px;
  }
</style>
