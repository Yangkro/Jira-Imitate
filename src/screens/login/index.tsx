import React from "react";
const apiUrl = process.env.REACT_APP_URL;
export const LoginScreen = () => {
  const login = (param: { username: string; password: string }) => {
    fetch(`${apiUrl}/login`, {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(param),
    }).then(async (response) => {
      if (response.ok) {
      }
    });
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //event默认是Element类型，但是默认的Element类型上是没有currentTarget.elements的所以需要用as关键字告诉TS类型检测，我知道这个是HTMLInputElement类型
    const username = (event.currentTarget.elements[0] as HTMLInputElement)
      .value;
    const password = (event.currentTarget.elements[1] as HTMLInputElement)
      .value;
    login({ username, password });
  };
  //为啥鼠标悬浮上去的不是React.FormEvent
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">用户名</label>
        <input type="text" />
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input type="password" />
      </div>
      <button type="submit">登录</button>
    </form>
  );
};
