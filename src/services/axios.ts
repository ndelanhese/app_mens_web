import { parseCookies } from 'nookies'
import axios from 'axios'

const getToken = () => {
  const { token } = parseCookies()
  return token
}

const getBaseURL = () => process.env.NEXT_PUBLIC_API_URL
const getTimeOut = () => {
  const FIVE_SECONDS_IN_MILLISECONDS = 5000
  return FIVE_SECONDS_IN_MILLISECONDS
}

export const api = axios.create({
  baseURL: getBaseURL(),
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
  timeout: getTimeOut(),
})

export const nextApi = axios.create({
  baseURL: '/api',
  timeout: getTimeOut(),
})
