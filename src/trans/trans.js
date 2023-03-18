import axios from "axios"
import router from "../router"
import { useUserState } from '../data'

export const http = axios.create({
    baseURL:
      import.meta.env.VITE_API_ADDRESS ?? 'https://simple-bbs.api.lnkkerst.me'
  })

http.interceptors.request.use(req => {
    const user = useUserState()
    const token = user.value.access_token
  
    if (token) {
      req.headers.set('Authorization', `Bearer ${token}`)
    }
    return req
    
  })
  
http.interceptors.response.use(
    res => res,
    err => {
      console.log(err)
      if (err.response.status === 401) {
        alert('登录失效，请重新登录')
        router.push('/login')
      }
      return Promise.reject(err)
    }
  );