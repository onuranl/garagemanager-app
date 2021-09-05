export default ({ $axios }) => ({
  get(companyID) {
    return $axios.get(`/supplier/${companyID}`)
  },
  create(data) {
    return $axios.post('/supplier/create', data)
  },
})
