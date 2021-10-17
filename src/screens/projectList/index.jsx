import React, {useEffect,useState} from "react"
import { List } from "./list"
import { SearchPanel } from "./searchPanel"

export const ProjectListScreen = () =>{
    const [list, setList] = useState([])
    const [param, setParam] = useState({
        name:"",
        personId
    })
    //获取项目列表接口代码
    useEffect(() => {
        fetch("").then(async response => {
            if(response.ok){
                setList(await response.json()) 
            }
        })
        return () => {
            cleanup
        }
    }, [param])
    return <div>
        <SearchPanel param={param} setParam={setParam}/>
        <List list={list}></List>
    </div>
}