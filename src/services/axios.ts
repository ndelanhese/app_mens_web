import axios from 'axios'
import cookies from 'js-cookie'

const FIVE_SECONDS_IN_MILLISECONDS = 5000
const baseURL = process.env.NEXT_PUBLIC_API_URL
const token = cookies.get('token')

export const api = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
  timeout: FIVE_SECONDS_IN_MILLISECONDS,
})

export const nextApi = axios.create({
  baseURL: '/api',
  timeout: FIVE_SECONDS_IN_MILLISECONDS,
})
