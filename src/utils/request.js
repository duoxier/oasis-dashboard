/****   request.js   ****/

import axios from 'axios'
import DonMessage from './message'
import router from '../router/index'
import Cookies from 'vue-cookies'
const service = axios.create({
  // 公共接口--这里注意后面会讲
  baseURL: process.env.BASE_API,
  // 超时时间 单位是ms，这里设置了3s的超时时间
  timeout: 5 * 1000
})
// 2.请求拦截器
service.interceptors.request.use(config => {
  config.data = JSON.stringify(config.data);
  if (config.method === 'post' || config.method === 'get') {
    config.headers = {
      'Content-Type': 'application/json;charset=UTF-8' //配置请求头
    }
  }
  const token = Cookies.get('token');
  if (token && config.url !== '/api/v1/login') {
    config.headers.token = token;
  }
  return config
}, error => {
  Promise.reject(error)
})

// 3.响应拦截器
service.interceptors.response.use(response => {

  /*TOKEN_ERROR("0010", "无效token"),
  TOKEN_EXPIRED("0011","用户登录已失效"),*/
  let _res = response
  if (_res.data.errorCode === 'OASIS_0011' || _res.data.errorCode === 'OASIS_0010') {
    // Cookie.remove('token')
    Cookies.remove('token')
    router.push({path: '/'});
    DonMessage.warning("登录已失效，请重新登录")
  }
  return response
}, error => {
  /***** 接收到异常响应的处理开始 *****/
  if (error && error.response) {
    // 1.公共错误处理
    // 2.根据响应码具体处理
    switch (error.response.status) {
      case 400:
        error.message = '错误请求'
        break;
      case 401:
        error.message = '未授权，请重新登录'
        break;
      case 403:
        error.message = '拒绝访问'
        break;
      case 404:
        error.message = '请求错误,未找到该资源'
        window.location.href = "/NotFound"
        break;
      case 405:
        error.message = '请求方法未允许'
        break;
      case 408:
        error.message = '请求超时'
        break;
      case 500:
        error.message = '服务器端出错'
        break;
      case 501:
        error.message = '网络未实现'
        break;
      case 502:
        error.message = '网络错误'
        break;
      case 503:
        error.message = '服务不可用'
        break;
      case 504:
        error.message = '网络超时'
        break;
      case 505:
        error.message = 'http版本不支持该请求'
        break;
      default:
        error.message = '内部服务错误'
    }
  } else {
    // 超时处理
    if (JSON.stringify(error).includes('timeout')) {
      DonMessage.error('服务器响应超时，请刷新当前页')
    }
    error.message('连接服务器失败')
  }

  DonMessage.error(error.message)
  /***** 处理结束 *****/
  return Promise.resolve(error.response)
})
//4.导入文件
export default service
