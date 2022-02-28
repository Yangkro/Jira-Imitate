import react, { useState } from "react";
const useArray = <T>(initialArray: T[]) => {
  const [value, setValue] = useState(initialArray);
  return {
    value,
    setValue,
    clear: () => {
      setValue([]);
    },
    removeIndex: (index: number) => {
      const valueCopy = [...value];
      valueCopy.splice(index, 1);
      setValue([...valueCopy]);
    },
    add: (item: T) => {
      setValue([...value, item]);
    },
  };
};
export { useArray };
