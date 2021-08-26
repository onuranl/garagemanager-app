export default ({ $axios }) => ({
  get() {
    return $axios.get('/job/get')
  },
  create(data) {
    return $axios.post('/job/create', data)
  },
})
