export default ({ $axios }) => ({
  get(companyID) {
    return $axios.get(`/date/${companyID}`)
  },
  getByID(id) {
    return $axios.get(`/date/one/${id}`)
  },
  getActive(companyID) {
    return $axios.get(`/date/active/${companyID}`)
  },
  create(data) {
    return $axios.post('/date/create', data)
  },
  update(id, data) {
    return $axios.put(`/date/update/${id}`, data)
  },
  remove(id) {
    return $axios.delete(`/date/remove/${id}`)
  },
  complete(id) {
    return $axios.put(`/date/complete/${id}`)
  },
})
