export default ({ $axios }) => ({
  get(id) {
    return $axios.get(`/product/${id}`)
  },
  getAll(companyID) {
    return $axios.get(`/product/getall/${companyID}`)
  },
  create(data) {
    return $axios.post('/product/create', data)
  },
  remove(productID) {
    return $axios.delete(`/product/remove/${productID}`)
  },
  getCategory(id) {
    return $axios.get(`/product/category/${id}`)
  },
  createCategory(data) {
    return $axios.post('/product/createcategory', data)
  },
})
