export default ({ $axios }) => ({
  getCustomer(companyID) {
    return $axios.get(`/customer/${companyID}`)
  },

  getCustomerVehicle(customerID) {
    return $axios.get(`/customer/getvehicle/${customerID}`)
  },

  create(customer) {
    return $axios.post('/customer/create', customer)
  },
})
