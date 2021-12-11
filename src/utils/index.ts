//在一个函数里，改变传入的对象本身的行为是不好的
export const isFalsy = (value: string | number) =>
  value === 0 ? false : !value;
export const clearObject = (object: any) => {
  //Object.assihn({},object)
  const newObject = { ...object };
  Object.keys(newObject).forEach((key) => {
    const value = newObject[key];
    if (isFalsy(value)) {
      delete newObject[key];
    }
  });
  return newObject;
};
