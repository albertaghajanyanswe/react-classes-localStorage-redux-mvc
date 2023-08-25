/*Auth MODEL Reducer*/

import { generateID, setStorageDataListByKey, setStorageDataItem, getStorageData } from "../../utils/helper";

const initialState = {
  meetings: getStorageData('meetings') || []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case "ADD_MEETING":
      const ID = generateID();
      setStorageDataListByKey('meetings', action.payload.meetings, action.payload.ownerId);
      return {
        ...state,
        meetings: [...state.meetings || [], {...action.payload.meetings, id: ID, ownerId: action.payload.ownerId}]
      };
    case "EDIT_MEETING":
      const filtredMeetings = state.meetings.filter(i => {
        return i.id !== action.payload.id
      });
      console.log(object)
      setStorageDataListByKey('meetings', [...filtredMeetings, action.payload]);
      return {
        ...state,
        meetings: [...filtredMeetings, action.payload]
      };
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