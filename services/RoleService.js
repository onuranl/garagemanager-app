export default ({ $axios }) => ({
  get() {
    return $axios.get('/role/get')
  },

  create(data) {
    return $axios.post('/role/create', data)
  },
})
