import React, { useState, useEffect } from "react";
interface SearchPanelProps {
  users: any;
  // par
}
export const SearchPanel = ({ users, param, setParam }) => {
  return (
    <form action="">
      <div>
        <input
          type="text"
          value={param.name}
          onChange={(event) =>
            setParam({
              ...param,
              name: event.target.value,
            })
          }
        />
        <select
          value={param.personId}
          onChange={(event) =>
            setParam({
              ...param,
              personId: event.target.value,
            })
          }
        >
          <option value={""}>负责人</option>
          {users.map((users) => (
            <option value={users.id} key={users.id}>
              {users.name}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
};
