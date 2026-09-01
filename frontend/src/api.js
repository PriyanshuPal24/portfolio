const PRODUCTION_API = 'https://portfolio-api-9e7k.onrender.com/api'

const isLocal = ['localhost', '127.0.0.1'].includes(window.location.hostname)

export const API_BASE = import.meta.env.VITE_API_BASE ?? (isLocal ? '/api' : PRODUCTION_API)