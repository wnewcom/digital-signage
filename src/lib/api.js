import axios from 'axios'

const api = axios.create({
  baseURL: '/api/v1',
  withCredentials: true,
})

// Auth API
export const authApi = {
  login: (credentials) => api.post('/user/login', credentials),
  logout: () => api.get('/user/logout'),
  me: () => api.get('/user/me'),
}

// Display API
export const displayApi = {
  getAll: () => api.get('/display'),
  getById: (id) => api.get(`/display/${id}`),
  create: (data) => api.post('/display', data),
  update: (id, data) => api.patch(`/display/${id}`, data),
  delete: (id) => api.delete(`/display/${id}`),
  getWidgets: (id) => api.get(`/display/${id}/widgets`),
}

// Slideshow API
export const slideshowApi = {
  getAll: () => api.get('/slideshow'),
  getById: (id) => api.get(`/slideshow/${id}`),
  create: (data) => api.post('/slideshow', data),
  update: (id, data) => api.patch(`/slideshow/${id}`, data),
  delete: (id) => api.delete(`/slideshow/${id}`),
  getSlides: (id) => api.get(`/slideshow/${id}/slides`),
  reorderSlides: (id, oldIndex, newIndex) => 
    api.patch(`/slideshow/${id}/reorder`, { oldIndex, newIndex }),
}

// Slide API
export const slideApi = {
  getAll: () => api.get('/slide'),
  getById: (id) => api.get(`/slide/${id}`),
  create: (data) => api.post('/slide', data),
  update: (id, data) => api.patch(`/slide/${id}`, data),
  delete: (id) => api.delete(`/slide/${id}`),
  upload: (file) => {
    const formData = new FormData()
    formData.append('data', file)
    return api.post('/slide/standalone_upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },
}

// Widget API
export const widgetApi = {
  getAll: () => api.get('/widgets'),
  getById: (id) => api.get(`/widgets/${id}`),
  create: (data) => api.post('/widgets', data),
  update: (id, data) => api.put(`/widgets/${id}`, data),
  delete: (id) => api.delete(`/widgets/${id}`),
}

export default api