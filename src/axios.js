import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.example.com', // 你的 API 基础 URL
  timeout: 10000, // 请求超时时间
  headers: { 'Content-Type': 'application/json' }
});

// 你还可以添加拦截器
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
