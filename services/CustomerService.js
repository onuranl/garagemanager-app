export default ({ $axios }) => ({
  getCustomer(companyID) {
    return $axios.get(`/customer/${companyID}`)
  },

  create(customer) {
    return $axios.post('/customer/create', customer)
  },
})
