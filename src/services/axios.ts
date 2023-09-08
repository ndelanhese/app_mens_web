import axios from 'axios';

const FIVE_SECONDS_IN_MILLISECONDS = 5000;

const getBaseURL = process.env.NEXT_PUBLIC_API_URL;

export const api = axios.create({
  baseURL: getBaseURL,
  timeout: FIVE_SECONDS_IN_MILLISECONDS,
});

export const nextApi = axios.create({
  baseURL: '/api',
  timeout: FIVE_SECONDS_IN_MILLISECONDS,
});
