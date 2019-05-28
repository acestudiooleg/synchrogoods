export const setItem = localStorage.setItem.bind(localStorage);
export const getItem = localStorage.getItem.bind(localStorage);
export const clear = localStorage.clear.bind(localStorage);
export const removeItem = localStorage.removeItem.bind(localStorage);
export const valueOf = localStorage.valueOf.bind(localStorage);
export const saveObject = obj => {
  Object.keys(obj).forEach(key => setItem(key, obj[key]));
};
export const setJson = (name, obj) =>
  setItem(name, JSON.stringify(obj));
export const getJson = name => JSON.parse(getItem(name));
