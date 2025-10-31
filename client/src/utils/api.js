import axios from 'axios'

const baseURL = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api`

const instance = axios.create({ baseURL })

let authToken = null

instance.interceptors.request.use((config) => {
  if (authToken) config.headers.Authorization = `Bearer ${authToken}`
  return config
})

const api = {
  setToken: (t) => { authToken = t },
  get: (url, cfg) => instance.get(url, cfg),
  post: (url, data, cfg) => instance.post(url, data, cfg),
}

export default api
