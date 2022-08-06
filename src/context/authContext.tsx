import { useMount } from "hooks";
import { type } from "os";
import React, { useState, ReactNode } from "react";
import { User } from "screens/projectList/searchPanel";
import { http } from "utils/http";
import * as auth from "../auth-provider";
export interface AuthForm {
  username: string;
  password: string;
}
/**
 * @description 登录持久化
 * @returns Promise(user)
 */
const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};
const AuthContext = React.createContext<
  | {
      user: User | null;
      register: (form: AuthForm) => Promise<void>;
      login: (form: AuthForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);
//displayName在实际开发中没有用，主要是用在devtools里面
AuthContext.displayName = "AuthContext";

/**
 *
 * @param param0 React.Node
 * @returns
 */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  //函数式编程point free： user=> setUser(user) === setUser
  const login = (form: AuthForm) => auth.login(form).then(setUser);
  const register = (form: AuthForm) => auth.register(form).then(setUser);
  const logout = () => auth.logout().then(() => setUser(null));
  useMount(() => {
    bootstrapUser().then(setUser);
  });
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
    throw new Error("useAuth必须在AuthProvider中使用");
  }
  return context;
};
