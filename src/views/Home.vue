<template>
  <div class="home">
    <UploadFile />
    <AccountInfo />
  </div>
</template>

<script>
import AccountInfo from '@/components/AccountInfo.vue'
import UploadFile from '@/components/UploadFile.vue'

export default {
  name: 'home',
  components: {
    AccountInfo,
    UploadFile
  }
}
</script>
