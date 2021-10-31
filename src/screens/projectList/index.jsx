import React, {useEffect,useState} from "react"
import qs from "qs"
import { useMount,useDebounce } from "hooks"
import {clearObject} from "utils/index"
import { List } from "./list"
import { SearchPanel } from "./searchPanel"
const apiURL = process.env.REACT_APP_URL
console.log(apiURL)
export const ProjectListScreen = () =>{
    const [list, setList] = useState([])
    const [param, setParam] = useState({
        name:"",
        personId:""
    })
    const [users, setUsers] = useState([])
    const debounceParam = useDebounce(param, 2000)
    console.log(222, debounceParam)
    //获取项目列表接口代码
    useEffect(() => {
        fetch(`${apiURL}/projects?${qs.stringify(clearObject(debounceParam))}`).then(async response => {
            if(response.ok){
                setList(await response.json()) 
            }
        })
    }, [debounceParam])
    //获取负责人
    useMount(() => {
        fetch(`${apiURL}/users?${qs.stringify(clearObject(param))}`).then(async response =>{
            if(response.ok){
                setUsers(await response.json())
            }
        })
    })
    return <div>
        <SearchPanel users={users} param={param} setParam={setParam}/>
        <List users={users} list={list}></List>
    </div>
}