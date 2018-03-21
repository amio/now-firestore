import axios from 'axios'

const env = typeof window !== 'undefined' ? window.__ENV__ : process.env
const { API_URL = 'http://localhost:3000' } = env || {}

const config = {
  timeout: 5000,
  baseURL: `${API_URL}/api`
}

export default axios.create(config)
