export default ({ $axios }) => ({
  get(companyID) {
    return $axios.get(`/offer/${companyID}`)
  },
  getByID(offerID) {
    return $axios.get(`/offer/one/${offerID}`)
  },
  create(data) {
    return $axios.post('/offer/create', data)
  },
  update(offerID, data) {
    return $axios.put(`/offer/update/${offerID}`, data)
  },
  remove(offerID) {
    return $axios.delete(`/offer/remove/${offerID}`)
  },
  complete(id) {
    return $axios.put(`/offer/complete/${id}`)
  },
})
