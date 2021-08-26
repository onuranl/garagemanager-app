export default ({ $axios }) => ({
  get() {
    return $axios.get('/jobtype/get')
  },

  create(data) {
    return $axios.post('/jobtype/create', data)
  },
})
