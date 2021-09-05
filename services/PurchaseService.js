export default ({ $axios }) => ({
  get(companyID) {
    return $axios.get(`/purchase/${companyID}`)
  },
  getByID(purchaseID) {
    return $axios.get(`/purchase/one/${purchaseID}`)
  },
  getTotal(companyID) {
    return $axios.get(`/purchase/total/${companyID}`)
  },
  create(data) {
    return $axios.post('/purchase/create', data)
  },
  update(purchaseID, data) {
    return $axios.put(`/purchase/update/${purchaseID}`, data)
  },
  remove(purchaseID) {
    return $axios.delete(`/purchase/remove/${purchaseID}`)
  },
  pay(purchaseID) {
    return $axios.put(`/purchase/pay/${purchaseID}`)
  },
})
