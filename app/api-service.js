const app = require('./app')

app.service('api', function($http) {
  let opts = {
    headers: {},
    withCredentials: true
  }
  const api = (req) => req.then(res => {
    // Enter post-processing here
    return res.data
  })
  this.login = data => api($http.post('/api/auth/login', data, opts))
  this.setToken = token => {
    this.token = token
    opts.headers.authentication = `Bearer ${token}`
  }

  this.crud = (apiPrefix) => ({
    list: () => api($http.get(`${apiPrefix}`, opts)),
    create: data => api($http.post(`${apiPrefix}`, data, opts)),
    read: id => api($http.get(`${apiPrefix}/${id}`, opts)),
    update: (id, data) => api($http.put(`${apiPrefix}/${id}`, data, opts))
  })
})