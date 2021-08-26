export default ({ $axios }) => ({
  get(id) {
    return $axios.get(`/product/${id}`)
  },
  create(data) {
    return $axios.post('/product/create', data)
  },
  getCategory(id) {
    return $axios.get(`/product/category/${id}`)
  },
  createCategory(data) {
    return $axios.post('/product/createcategory', data)
  },
})
