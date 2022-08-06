//可以了解一下firebase等第三方auth服务
/**
 * 登录服务
 */
import { User } from "screens/projectList/searchPanel";
const apiUrl = process.env.REACT_APP_API_URL;
const localStorageKey = "__auth_provider_token__";
/**
 * 
 * @returns 登录token
 */
export const getToken = () => window.localStorage.getItem(localStorageKey);

/**
 * @description 处理登录/注册后的用户信息
 * @param param0 user 用户信息
 * @returns 用户信息
 */
export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || "");
  return user;
};

/**
 * 
 * @param data 登录信息，账号&密码
 * @returns 用户信息
 */
export const login = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/login`, {
    method: "post",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      return handleUserResponse(await response.json());
    } else {
      return Promise.reject(response);
    }
  });
};

/**
 * @description 注册
 * @param data 账号&密码
 * @returns 用户信息
 */
export const register = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/register`, {
    method: "post",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      return handleUserResponse(await response.json());
    } else {
      return Promise.reject(response);
    }
  });
};

/**
 * @description 登出
 */
export const logout = async () => {
  window.localStorage.removeItem(localStorageKey);
};
