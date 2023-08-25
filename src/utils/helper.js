export const setStorageDataItemByKey = (key, value) => {
  const data = localStorage.getItem('state');
  const storageData = data && JSON.parse(data) || {};
  storageData[key] = value;

  localStorage.setItem('state', JSON.stringify(storageData));
}

export const setStorageDataItem = (key, value) => {
  const storageData = (typeof value === 'object') ? JSON.stringify(value) : value;
  localStorage.setItem(key, storageData);
}

export const setStorageDataListByKey = (key, value, userId = -1) => {
  const ID = generateID();
  const data = localStorage.getItem(key);
  let storageData = data && JSON.parse(data) || [];
  storageData = userId === -1 ? [...storageData, {...value, id: ID}] : [...storageData, {...value, id: ID, ownerId: userId}];
  localStorage.setItem(key, JSON.stringify(storageData));
}

export const clearStorageData = () => {
  localStorage.clear();
}

export const removeStorageDataByKey = (key) => {
  localStorage.removeItem(key);
}

export const getStorageData = (key) => {
  const data = localStorage.getItem(key);
  let storageData = data && JSON.parse(data) || null;

  return storageData;
}

export const generateID = () => {
  return '_' + Math.random().toString(36).substr(2, 9);
};