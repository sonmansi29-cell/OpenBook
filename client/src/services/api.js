import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://openbook-api-ay0r.onrender.com/api',
})

export default api