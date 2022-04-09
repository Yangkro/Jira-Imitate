/*
 * @Author: your name
 * @Date: 2022-04-09 22:42:02
 * @LastEditTime: 2022-04-10 00:23:21
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \jira-imitate\src\context\authContext.ts
 */
import React, { useState, ReactNode } from "react";
import { User } from "screens/projectList/searchPanel";
import * as auth from "../auth-provider";
export interface AuthForm {
  username: string;
  password: string;
}
const AuthContext = React.createContext<
  | {
      user: User | null;
      register: (form: AuthForm) => Promise<void>;
      login: (form: AuthForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);
AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  //函数式编程point free： user=> setUser(user) === setUser
  const login = (form: AuthForm) => auth.login(form).then(setUser);
  const register = (form: AuthForm) => auth.register(form).then(setUser);
  const logout = () => auth.logout().then(() => setUser(null));
  // Please use tsx instead of ts it has some minute differences. tsx obviously allows the usage of jsx tags inside typescript.
  return (
    <AuthContext.Provider
      value={{ user, login, register, logout }}
      children={children}
    />
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth必须在AuthPorvider中使用");
  }
  return context;
};
