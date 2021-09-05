export default ({ $axios }) => ({
  get(customerID) {
    return $axios.get(`/vehicle/get/${customerID}`)
  },

  create(data) {
    return $axios.post('/vehicle/create', data)
  },
})
