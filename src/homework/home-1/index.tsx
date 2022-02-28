import React, { useState } from "react";
import { useArray } from "./hooks/useArray";
interface PersonInterface {
  name: string;
  age: number;
}
const HomeWork1 = () => {
  const persons: PersonInterface[] = [
    { name: "zhangsan", age: 20 },
    { name: "lihua", age: 21 },
  ];
  const { value, clear, removeIndex, add } = useArray(persons);
  return (
    <div>
      <button onClick={() => add({ name: "Lisi", age: 23 })}>add Lisi</button>
      <button onClick={() => removeIndex(0)}>remove 0</button>
      <button style={{ marginBottom: "50px" }} onClick={() => clear()}>
        clear
      </button>
      {value.map((person: PersonInterface, index: number) => {
        return (
          <div style={{ marginBottom: "30px" }}>
            <span style={{ color: "red" }}>{index}</span>
            <span>{person.name}</span>
            <span style={{ marginLeft: "10px" }}>{person.age}</span>
          </div>
        );
      })}
    </div>
  );
};
export default HomeWork1;
