export default ({ $axios }) => ({
  get(companyID) {
    return $axios.get(`/date/${companyID}`)
  },
  getActive(companyID) {
    return $axios.get(`/date/active/${companyID}`)
  },
  create(data) {
    return $axios.post('/date/create', data)
  },
  remove(id) {
    return $axios.delete(`/date/remove/${id}`)
  },
  complete(id) {
    return $axios.put(`/date/complete/${id}`)
  },
})
