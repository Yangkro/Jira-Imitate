### 添加多个 git 厂库

- 查看当前远程厂库用户名密码
  git config user.name
  git config user.email
  git remote -v

- 添加其他远程厂库并推送到指定的厂库
  git remote add gitee https:xxxx
  //-u 指定默认的远程仓库
  git push -u gitee branchName

- 涉及到 native 标签的类型可以按住 ctrl 鼠标悬浮查看类型

- TS 接口的继承
  TS 接口可以继承，native 标签类型都是继承至 Element 的类型

  ```
  interface Base {
    id:number
  }
  interface Advance extends Base {
    name:string
  }
  const test = (p:Base)=>{

  }
  const a:Advance = {id:1, name:'abc'}
  test(a)//不会报错
  ```
