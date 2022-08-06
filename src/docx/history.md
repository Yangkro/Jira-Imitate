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

### TS 高级数据类型

- 联合类型
  联合类型使用`|`，可以为一个变量定义多种数据类型，但是必须是其中的一种。

- 类型别名
  使用`type`关键字进行声明，在开发中可以与`interface`互换。差别在于：

  1. `type`可以定义联合类型和交叉类型，`interface`不可以


      ```
      let myfavorateNumber:string|number
      let jackFavorateNumber = 7
      type favorateNumber = string|number
      let marryFavorateNumber: favorateNumber = '6'
      ```

  2. `interface`无法实现`utility type`
     js 中的 typeof 是在 runtime 时运行的，而 ts 中的 typeof 是在编译的时候运行的，ts 的 typeof 的作用是将后面变量的参数类型返回提取出来

- utility type
  用泛型给它传入一个其他类型，然后 utility type 对这个类型就行进行某种操作，具体操作实现可以查看 Pick Exclude 的实现
  1、 Parameters 提取泛型中的类型，并且以数组的形式返回
  ` const aaa = (name: string, id: number)=>{ return { name, id } } type newType = Parameters<typeof aaa> `
  2、Partial 将泛型中的类型变成可选类型，可以不传
  ` type Person = { name:string age:number } const xiaoming : Partial<Person> = {name: 'xiaoming'} const xiaofang : Partial<Person> = {age: 12} const xiaoliang : Partial<Person> = {xxx:'aaaa'} //本质实现是 type Partial<T> = { [P in keyof T]?: T[P] } `
  3、Omit 指定删除泛型中的类型，保留其他类型
  ` const Person = { name:string age:number } //必须有年龄类型 const xiaoming : Omit<Person, 'name'> = {age: 12} //name 和 age 都不要了 const xiaofang : Omit<Person, 'name'|'age'> = {} `
