<template>
  <div>
    <input type="file" id="file" ref="file" v-on:change="handleFileUpload()" />
    <button v-on:click="submitFile()">Submit</button>
    {{ file }}
  </div>
</template>
<script>
export default {
  /*
      Defines the data used by the component
    */
  data() {
    return {
      file: '',
    }
  },

  methods: {
    /*
        Submits the file to the server
      */
    submitFile() {
      /*
                Initialize the form data
            */
      let formData = new FormData()

      /*
                Add the form data we need to submit
            */
      formData.append('file', this.file)

      console.log(formData)

      /*
          Make the request to the POST /single-file URL
        */
      this.$axios
        .post('/uploads', formData)
        .then(function () {
          console.log('SUCCESS!!')
        })
        .catch(function () {
          console.log('FAILURE!!')
        })
    },

    /*
        Handles a change on the file upload
      */
    handleFileUpload() {
      this.file = this.$refs.file.files[0]
    },
  },
}
</script>

<style></style>
