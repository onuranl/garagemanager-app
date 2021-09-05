export default ({ $axios }) => ({
  get(id) {
    return $axios.get(`/store/${id}`)
  },
  getByStoreID(id) {
    return $axios.get(`/store/detail/${id}`)
  },
  create(data) {
    return $axios.post('/store/create', data)
  },
  update(id, data) {
    return $axios.put(`/store/update/${id}`, data)
  },
  remove(id) {
    return $axios.delete(`/store/remove/${id}`)
  },
})
