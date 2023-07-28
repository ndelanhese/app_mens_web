import { parseCookies } from 'nookies'
import axios from 'axios'

const getToken = () => {
  const { token } = parseCookies()
  console.log(token)
  return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Ik5hdGhhbiBIZW5yaXF1ZSBQLiBEZWxhbmhlc2UiLCJlbWFpbCI6Im5uYXRoYW5oM0BnbWFpbC5jb20iLCJpYXQiOjE2OTA1MDUzOTYsImV4cCI6MTY5MDU5MTc5Nn0.Vjy8W4pMh-LOXp38UYyPTOqHJBR6KAkhts5ZbhkscC4'
}

// FIXME -> Arrumar o token

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
