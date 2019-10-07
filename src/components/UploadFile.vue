<template>
  <div class="upload-container">
    <div class="upload-file has-text-centered" v-cloak @drop.prevent="addFile" @dragover.prevent>
      <div class="prompt has-text-grey" v-show="files.length == 0">
        <h4>Drag & Drop the files here to upload!</h4>
      </div>

      <ul v-for="file in files" :key="file.name">
        <li>
          <span>{{ file.name }} | {{ file.size }} KB</span>
        </li>
      </ul>
    </div>
    <button
      class="button is-rounded is-primary"
      :class="{'is-loading': uploadStarted}"
      :disabled="uploadDisabled"
      @click="uploadFiles"
    >Upload</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'UploadFile',
  data () {
    return {
      uploadStarted: false,
      files: [],
      fileHashes: []
    }
  },
  computed: {
    uploadDisabled () {
      return this.files.length === 0
    }
  },
  methods: {
    addFile (e) {
      let droppedFiles = e.dataTransfer.files
      if (!droppedFiles) return;
      [...droppedFiles].forEach(f => {
        this.files.push(f)
      })
    },
    removeFile (file) {
      this.files = this.files.filter(f => {
        return f !== file
      })
    },
    uploadFiles () {
      this.uploadStarted = true
      let formData = new FormData()
      this.files.forEach((f, i) => {
        formData.append(`File${i + 1}`, f)
      })

      axios
        .post(
          `https://api.openload.co/1/file/ul?login=98fad8486c4f8310&key=oXQWoeUf&httponly=false`
        )
        .then(res => {
          console.log(res.data)

          if (res.data.status === 200) {
            axios
              .post(res.data.result.url, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
              })
              .then(res => {
                console.log(res)
                alert('Upload Successful!')
                this.files = []
                this.uploadStarted = false
              })
              .catch(err => {
                console.log(err)
                this.uploadStarted = false
              })
          } else {
            alert('Could not get an upload url, status: ' + res.data.status)
            this.uploadStarted = false
          }
        })
        .catch(err => {
          console.log('Error: ' + err.message)
          this.files = []
          this.uploadStarted = false
        })
    }
  }
}
</script>

<style scoped lang="scss">
.upload-container {
  margin: 25px;
}

.upload-file {
  position: relative;
  margin: 10px 0;
  width: 500px;
  height: 400px;
  background: rgb(231, 231, 231);
  border: solid 3px rgb(197, 197, 197);
  border-radius: 15px;

  .prompt {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
