import axios from "axios";
import Profile from "../views/profile/Profile";

export function request(config) {
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:7888/api/hy66',

  })

// 2.1.请求拦截的作用
  instance.interceptors.request.use(config => {
    return config
  }, err => {
    // console.log(err);
  })

// 2.2.响应拦截
  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err);
  })


  return instance(config);

}
