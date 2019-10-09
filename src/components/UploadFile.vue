<template>
  <div class="upload-container">
    <h3 class="subtitle">Upload Files</h3>
    <div class="upload-file has-text-centered" v-cloak @drop.prevent="addFile" @dragover.prevent>
      <div class="prompt has-text-grey" v-show="files.length == 0">
        <h4>Drag & Drop the files here to upload!</h4>
      </div>

      <ul v-for="(file, i) in files" :key="file.name">
        <li>
          <span class="is-size-7">
            {{ i+1 }}. {{ file.name.substring(0, 40) }} | {{ (file.size / (1024*1024)).toString().substring(0, 4) }} MB
          </span>
        </li>
      </ul>
    </div>
    <button
      :class="{'button is-rounded is-primary is-loading':uploadStarted, 'button is-rounded is-primary': !uploadStarted}"
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
      this.files.forEach((file, idx, obj) => {
        let formData = new FormData()
        formData.set(file.name, file)

        axios
          .post(
            `https://api.openload.co/1/file/ul?login=98fad8486c4f8310&key=oXQWoeUf`
          )
          .then(res => {
            if (res.data.status === 200) {
              console.log('Upload Url: ' + res.data.result.url)
              axios
                .post(res.data.result.url, formData, {
                  headers: { 'Content-Type': 'multipart/form-data' }
                })
                .then(res => {
                  console.log(`Successfully Uploaded: ${file.name}`)
                  // remove the uploaded file from files array
                  this.$notify({
                    group: 'all',
                    type: 'success',
                    title: 'Upload Successful!',
                    text: `${file.name} has been successfully uploaded to Openload servers.`
                  })
                  obj.splice(obj.indexOf(file), 1)
                  this.uploadStarted = false
                })
                .catch(err => {
                  console.log(`Cannot upload file ${file.name}, error: ${err}`)
                  this.uploadStarted = false
                })
            } else {
              this.$notify({
                group: 'all',
                type: 'error',
                title: 'Upload Failed!',
                text: `Could not get an uploaded url, status code: ${res.data.status}`
              })
              console.log(res.data)
              obj.splice(obj.indexOf(file), 1)
              this.uploadStarted = false
            }
          })
          .catch(err => {
            console.err('Cannot Upload file: ' + file.name)
            console.err(err)
            obj.splice(idx, 1)
            this.uploadStarted = false
          })
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
