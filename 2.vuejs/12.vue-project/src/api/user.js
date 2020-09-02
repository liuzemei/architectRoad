import * as config from "./config";
import axios from "./http";

// 接口的调用 如果接口需要将返回的结果 放到 vuex 中， 需要把调用放到 action 中

export const login = (options = {}) => {
  let { username, password, code, uid } = options;
  if (username && password && code && uid) {
    return axios.post(config.login, options);
  } else return Promise.reject("登录参数不正确");
};

export const validate = () => axios.get(config.validate)