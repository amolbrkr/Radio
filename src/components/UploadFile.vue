<template>
  <div class="upload-file">
    <div class="prompt">
      <h3>Drag & Drop files here to upload!</h3>
      <span>
        Or <button class="upload-btn">Browse</button> the file
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UploadFile'
}
</script>

<style scoped lang="scss">
.upload-file {
  position: relative;
  width: 500px;
  height: 500px;
  background: rgb(231, 231, 231);
  border: solid 3px rgb(197, 197, 197);
  border-radius: 15px;

  .prompt {
    position: absolute;
    z-index: 3;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
