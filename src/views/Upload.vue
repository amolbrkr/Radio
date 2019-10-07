<template>
  <div class="upload">
    <UploadFile />
    <FileExplorer />
  </div>
</template>

<script>
import UploadFile from '@/components/UploadFile.vue'
import FileExplorer from '@/components/FileExplorer.vue'

export default {
  name: 'upload',
  components: {
    UploadFile,
    FileExplorer
  }
}
</script>

<style lang="scss">
.upload {
  margin: 10px;
  display: flex;
  justify-content: space-evenly;
}

@media screen and (max-width: 800px) {
  .upload {
    flex-direction: column;
  }
}
</style>
