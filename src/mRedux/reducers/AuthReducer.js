/*Auth MODEL Reducer*/

import { generateID, setStorageDataListByKey, setStorageDataItem, getStorageData, removeStorageDataByKey } from "../../utils/helper";

const initialState = {
  users: getStorageData('users') || [],
  user: getStorageData('user') || {}
};

  // eslint-disable-next-line import/no-anonymous-default-export
  export default function(state = initialState, action) {

    switch (action.type) {
      case "ADD_USER":
        const ID = generateID();
        setStorageDataListByKey('users', action.payload);
        return {
          ...state,
          users: [...state.users || [], {...action.payload, id: ID}]
        };
      case "ADD_CURRENT_USER":
        setStorageDataItem('user', action.payload);
        return {
          ...state,
          user: action.payload
        };
      case "LOG_OUT":
        removeStorageDataByKey('user');
        return {
          ...state,
          user: {}
        };
      default:
        return state;
    }
  }
