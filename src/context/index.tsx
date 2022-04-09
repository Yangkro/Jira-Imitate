import react, { ReactNode } from "react";
import { AuthProvider } from "./authContext";
/*
 * @Author: your name
 * @Date: 2022-04-09 22:39:53
 * @LastEditTime: 2022-04-10 00:19:16
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \jira-imitate\src\context\index.ts
 */
export const AppProviders = ({ children }: { children: ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};
