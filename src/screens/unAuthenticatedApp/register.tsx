/*
 * @Author: your name
 * @Date: 2022-03-26 17:38:17
 * @LastEditTime: 2022-04-10 00:28:58
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \jira-imitate\src\screens\login\index.tsx
 */
import { useAuth } from "context/authContext";
import React from "react";
export const RegisterScreen = () => {
  const { register, user } = useAuth();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //event默认是Element类型，但是默认的Element类型上是没有currentTarget.elements的所以需要用as关键字告诉TS类型检测，我知道这个是HTMLInputElement类型
    const username = (event.currentTarget.elements[0] as HTMLInputElement)
      .value;
    const password = (event.currentTarget.elements[1] as HTMLInputElement)
      .value;
    register({ username, password });
  };
  //为啥鼠标悬浮上去的不是React.FormEvent
  return (
    <form onSubmit={handleSubmit}>
      {user && <div>{user.name}</div>}
      <div>
        <label htmlFor="username">用户名</label>
        <input type="text" />
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input type="password" />
      </div>
      <button type="submit">注册</button>
    </form>
  );
};
