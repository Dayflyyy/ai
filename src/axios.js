import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://aa7e-122-96-148-10.ngrok-free.app', // 你的 API 基础 URL
  timeout: 20000, // 请求超时时间
  headers: { 'Content-Type': 'application/json' }
});
//
export async function fetchWithStream(url, data = {}) {
    const response = await fetch(instance.defaults.baseURL + url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify(data),
    });
  
    return response;
  }

//拦截器
instance.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么，比如添加 token
    return config;
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  response => {
    // 对响应数据做些什么
    return response;
  },
  error => {
    // 对响应错误做些什么
    return Promise.reject(error);
  }
);

export default instance;
