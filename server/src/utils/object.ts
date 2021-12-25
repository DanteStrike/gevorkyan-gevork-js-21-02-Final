const updateObject = <T>(oldObject: T, newValues: Partial<T>, ...additionalValues: Partial<T>[]) =>
  Object.assign({}, oldObject, newValues, ...additionalValues);

export default {
  updateObject,
};
