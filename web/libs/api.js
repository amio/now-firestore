import axios from 'axios'

function getApiURL () {
  const env = typeof window !== 'undefined' ? window.__ENV__ : process.env
  const { API_URL, NODE_ENV } = env || {}

  if (API_URL) {
    return API_URL
  }

  if (NODE_ENV === 'production') {
    return 'https://forms.hicto.tech'
  }

  return 'http://localhost:3000'
}

// console.log('[api-url]', getApiURL())

const config = {
  timeout: 5000,
  baseURL: `${getApiURL()}/api`
}

export default axios.create(config)
