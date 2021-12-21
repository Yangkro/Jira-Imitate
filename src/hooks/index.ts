import React, { useEffect, useState } from "react";
import { setTimeout } from "timers";

//该文件为用户的自定义hooks
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};

//节流函数debounce
// export const debounce = (callback, delay) => {
//     let timeout
//     return (...params) => {
//         if (timeout) {
//             clearTimeout(timeout)
//         }
//         timeout = setTimeout(() => {
//             callback(...params)
//         }, delay)
//     }
// }
export const useDebounce = (value: any, delay: number) => {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    //每次在value变化之后设置一个定时器
    const timeout = setTimeout(() => {
      setDebounceValue(value);
    }, delay || 0);
    // 在清理上一次的useEffect的定时器之后在运行
    return () => {
      clearTimeout(timeout);
    };
  }, [value, delay]);
  return debounceValue;
};
