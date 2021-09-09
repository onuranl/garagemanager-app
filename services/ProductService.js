export default ({ $axios }) => ({
  get(id) {
    return $axios.get(`/product/${id}`)
  },
  getOne(id) {
    return $axios.get(`/product/one/${id}`)
  },
  getAll(companyID) {
    return $axios.get(`/product/getall/${companyID}`)
  },
  create(data) {
    return $axios.post('/product/create', data)
  },
  update(id, data) {
    return $axios.put(`/product/update/${id}`, data)
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
