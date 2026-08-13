import api from './api'

export const registerUser = async (data) => (await api.post('/auth/register/', data)).data
export const loginUser = async (data) => (await api.post('/auth/login/', data)).data
export const getProfile = async (token) => (
  await api.get('/auth/profile/', { headers: { Authorization: `Bearer ${token}` } })
).data
export const logoutUser = async (refresh, token) => api.post(
  '/auth/logout/', { refresh }, { headers: { Authorization: `Bearer ${token}` } },
)
