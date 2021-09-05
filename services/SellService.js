export default ({ $axios }) => ({
  get(companyID) {
    return $axios.get(`/sell/${companyID}`)
  },
  getByID(sellID) {
    return $axios.get(`/sell/one/${sellID}`)
  },
  getTotal(companyID) {
    return $axios.get(`/sell/total/${companyID}`)
  },
  create(data) {
    return $axios.post('/sell/create', data)
  },
  update(sellID, data) {
    return $axios.put(`/sell/update/${sellID}`, data)
  },
  remove(sellID) {
    return $axios.delete(`/sell/remove/${sellID}`)
  },
  collect(sellID) {
    return $axios.put(`/sell/collect/${sellID}`)
  },
})
