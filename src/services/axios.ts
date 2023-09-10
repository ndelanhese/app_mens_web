import axios from 'axios';

const FIVE_SECONDS_IN_MILLISECONDS = 5000;

const getBaseURL = process.env.NEXT_PUBLIC_API_URL;

const isServer = typeof window === 'undefined';

export const nextApi = axios.create({
  baseURL: '/api',
  timeout: FIVE_SECONDS_IN_MILLISECONDS,
});

const getServerToken = () => {
  if (isServer) return;
  return nextApi
    .get('/auth/token')
    .then(response => response.data.token)
    .catch(error => {
      console.error('Erro ao obter o token do servidor:', error);
      return null;
    });
};

export const api = axios.create({
  baseURL: getBaseURL,
  timeout: FIVE_SECONDS_IN_MILLISECONDS,
});

getServerToken()?.then(token => {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
});
