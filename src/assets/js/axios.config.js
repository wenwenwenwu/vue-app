import Vue from 'vue';
import axios from 'axios';

axios.defaults.baseURL = 'http://api.imooc.hybrid.lgdsunday.club/';

// axios.interceptors是拦截器
// 所有使用axios发送的请求，都会先进入该方法
axios.interceptors.request.use(config => {
  if (config.params) {
    config.params.token = 'e4a0c730-f31b-11ea-8930-e5fa1f6c40e0';
  } else {
    config.params = {
      token: 'e4a0c730-f31b-11ea-8930-e5fa1f6c40e0'
    };
  }
  return config;
});

//所有使用axios发送请求的返回结果，都会先进入该方法
axios.interceptors.response.use(
  response => {
    return response.data.data;
  },
  error => {
    return Promise.reject(error);
  }
);

//项目中通过this.$http访问
Vue.prototype.$http = axios;