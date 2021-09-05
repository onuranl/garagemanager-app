export default ({ $axios }) => ({
  get(id) {
    return $axios.get(`/job/get/${id}`)
  },
  create(data) {
    return $axios.post('/job/create', data)
  },
  complete(jobID) {
    return $axios.put(`/job/complete/${jobID}`)
  },
  update(id, data) {
    return $axios.put(`/job/update/${id}`, data)
  },
  remove(id) {
    return $axios.delete(`/job/remove/${id}`)
  },
})
