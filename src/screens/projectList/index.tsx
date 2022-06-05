import React, { useEffect, useState } from "react";
import qs from "qs";
import { useMount, useDebounce } from "hooks";
import { clearObject } from "utils/index";
import { List } from "./list";
import { SearchPanel } from "./searchPanel";
import { useHttp } from "utils/http";
export const ProjectListScreen = () => {
  const [users, setUsers] = useState([]);
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const debouncedParam = useDebounce(param, 2000);
  const [list, setList] = useState([]);
  const client = useHttp()
  //获取项目列表接口代码
  useEffect(() => {
    client('projects', {data:clearObject(debouncedParam)}).then(setList)
  }, [debouncedParam]);
  //获取负责人
  useMount(() => {
    client('users').then(setUsers)
  });
  return (
    <div>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list}></List>
    </div>
  );
};
