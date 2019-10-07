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
    <table class="table">
      <thead>
        <tr>
          <th>No.</th>
          <th>File Name</th>
          <th>Size (Mb)</th>
          <th>Uploaded At</th>
          <th>Downloads</th>
        </tr>
      </thead>
      <tbody v-for="(file, i) in files" :key="file.name">
        <tr>
          <th>{{ i + 1}}</th>
          <td><a :href="file.link" target="_blank">{{ file.name }}</a></td>
          <td>{{ (file.size / (1024 * 1024)).toString().substring(0, 8) }}</td>
          <td>{{ new Date(parseInt(file.upload_at)).toLocaleDateString() }}</td>
          <td class="has-text-centered">{{ file.download_count }}</td>
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
    fetchFiles () {
      axios
        .get(
          `https://api.openload.co/1/file/listfolder?login=98fad8486c4f8310&key=oXQWoeUf`
        )
        .then(res => {
          if (res.data.status === 200) {
            this.files = res.data.result.files
          } else {
            alert(
              `Something went wrong while fetching files! Error Code: ${res.data.status}`
            )
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
