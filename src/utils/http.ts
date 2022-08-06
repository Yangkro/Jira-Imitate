import qs from 'qs'
import * as auth from 'auth-provider'
import { useAuth } from 'context/authContext';
import { config } from 'process';
import { stringify } from 'querystring';
const apiUrl = process.env.REACT_APP_API_URL;
interface Config extends RequestInit {
    token?:string
    data?:object
}

/**
 * @description 对fetch方法的封装
 * @param url 请求路径
 * @param param1 请求参数
 * @returns Promise
 */
export const http = async(url:string, {data, token, headers, ...customConfig}:Config = {})=>{
    const config = {
        method:'GET',
        headers:{
            Authorization: token?`Bearer ${token}`:'',
            'Content-Type':data? 'application/json':''
        },
        ...customConfig
    }
    if(config.method.toLocaleUpperCase() === 'GET'){
        url = url +`?${qs.stringify(data)}`
    }else {
        //除了get请求都是将参数放在body中
        config.body = JSON.stringify(data || {})
    }
    return window.fetch(`${apiUrl}/${url}`, config).then(async (response)=>{
        //response的类型是fetch的Response，所以有ok\status等属性
        if(response.status === 401){
            await auth.logout()
            window.location.reload()
            return Promise.reject({message:'重新登陆'})
        }
        const data = await response.json()
        if(response.ok){
            return data
        }else{
            //fetch API在401 500的情况下不会直接捕获并抛出服务端错误，只会在断网等情况下抛出错误。所以在这里需要手动捕获服务端异常
            //axios和fetch不一样，捕获并爆出非2xx的异常
            return Promise.reject(data)
        }
    }).catch(()=>{
        //捕获断网等情况
        return Promise.reject({message: '网络错误'})
    })
}

/**
 * @description 封装一个携带token的请求方法
 * 因为需要用全局的user信息，需要使用useAuth hook，所以函数本身也得是个hook
 * @returns 请求方法，方法携带token
 */
export const useHttp =()=>{
    //封装一个自带token的hook
    const {user} = useAuth()
    //下面这个返回的函数是俩参数不是一个哦
    //Parameters 使用已有变量的类型作为新变量的类型，相当于这种写法
    return (...[url, config]:Parameters<typeof http>)=>  http(url, {...config, token: user?.token})
    // return ([url, config]:[string, Config])=> http(url, {...config, token:user?.token})
}