// 对 axios 二次封装
import axios from "axios";

// axios.interceptors.request.use((config) => {});

// 封装的目的是封装公共的拦截器，每个实例有自己的拦截器。

const instance = axios.create(); // 创建一个单独的实例，可以直接使用这个实例
instance.interceptors.request;
class Http {
  constructor() {
    this.timeout = 3000; // 超时时间

    this.baseURL =
      process.env.NODE_ENV === "development"
        ? "http://www.fullstackjavascript.cn:8888"
        : "";
  }
  mergeOptions(options) {
    return { timeout: this.timeout, baseURL: this.baseURL, ...options };
  }
  setInterceptors(instance) {
    instance.interceptors.request.use((config) => {
      return config;
    });

    instance.interceptors.response.use(
      (res) => {
        if (res.status === 200) {
          if (res.data.err == 1) {
            return Promise.reject(res.data);
          }
          return res.data.data;
        } else {
          // 401 403 ...
          return Promise.reject(res);
        }
      },
      (err) => {
        // 失败直接返回失败的 promise
        return Promise.reject(err);
      }
    );
  }
  request(options) {
    // 用户的参数 + 默认参数 = 总参数
    const opts = this.mergeOptions(options);
    // 队请求的超时，切换取消请求 loading

    const axiosInstance = axios.create();
    // 添加拦截器
    this.setInterceptors(axiosInstance);
    // 当调用 axios.request 时，内部会创建一个 axios 实例 并且给这个实例传入配置属性
    return axiosInstance(opts);
  }
  // 下边两个方法只是对 request 的一个简写调用
  get(url, config = {}) {
    return this.request({ url, method: "get", ...config });
  }
  post(url, data) {
    return this.request({ method: "post", url, data });
  }
}

export default new Http();
