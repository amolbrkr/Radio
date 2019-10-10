<template>
  <div class="file-explorer">
    <span class="subtitle">
      Files in Openload Server
      <button class="button is-small" @click="fetchFiles">
        <span class="icon is-small">
          <i class="material-icons">refresh</i>
        </span>
      </button>
    </span>
    <br />
    <br />
    <table class="table is-bordered is-narrow is-fullwidth">
      <thead>
        <tr>
          <th>File Name</th>
          <th>Size (MB)</th>
          <th>Uploaded At</th>
          <th>Downloads</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody v-for="file in files" :key="file.name">
        <tr>
          <td><a :href="file.link" target="_blank">{{ file.name }}</a></td>
          <td>{{ (file.size / (1024 * 1024)).toString().substring(0, 4) }}</td>
          <td>{{ new Date(parseInt(file.upload_at)).toLocaleDateString() }}</td>
          <td class="has-text-centered">{{ file.download_count }}</td>
          <td class="has-text-centered">
            <button class="button is-small" @click="deleteFile(file.linkextid)">
              <span class="icon">
                <i class="material-icons">delete_outline</i>
              </span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'FileExplorer',
  data () {
    return {
      files: []
    }
  },
  mounted () {
    this.fetchFiles()
  },
  methods: {
    deleteFile (fileId) {
      axios
        .get(`https://api.openload.co/1/file/delete?login=${process.env.VUE_APP_API_LOGIN}&key=${process.env.VUE_APP_API_KEY}&file=${fileId}`)
        .then(res => {
          if (res.data.status === 200) {
            this.$notify({
              group: 'all',
              type: 'success',
              title: 'Delete Successful!',
              text: `Successfully deleted file: ${fileId}`
            })
            this.fetchFiles()
          }
        }).catch(err => {
          this.$notify({
            group: 'all',
            type: 'error',
            title: 'Delete Failed!',
            text: `Error while deleting file: ${err}`
          })
          this.fetchFiles()
        })
    },
    fetchFiles () {
      axios
        .get(
          `https://api.openload.co/1/file/listfolder?login=${process.env.VUE_APP_API_LOGIN}&key=${process.env.VUE_APP_API_KEY}`
        )
        .then(res => {
          if (res.data.status === 200) {
            this.files = res.data.result.files
          } else {
            this.$notify({
              group: 'all',
              type: 'warn',
              title: 'Cannot Get files!',
              text: `Could not get an uploaded url, status code: ${res.data.status}`
            })
          }
        })
        .catch(err => {
          console.error('Error: ' + err)
        })
    }
  }
}
</script>

<style>
.file-explorer {
  margin: 25px;
}
</style>
