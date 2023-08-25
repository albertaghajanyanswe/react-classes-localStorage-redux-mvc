/*Auth MODEL Reducer*/

import { generateID, setStorageDataListByKey, setStorageDataItem, getStorageData } from "../../utils/helper";

const initialState = {
  meetings: getStorageData('meetings') || []
};

export default function(state = initialState, action) {
  switch (action.type) {
c
    case "DELETE_MEETING":
      setStorageDataItem('meetings', action.payload);
      return {
        ...state,
        meetings: action.payload
      };
    default:
      return state;
  }
}
