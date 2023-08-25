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
      console.log("556565656544444444444 ", state.meetings)
      console.log("556565656544444444444 ", typeof(state.meetings))
      const existingMeeting = state.meetings.find(i => {
        return i.id === action.payload.id
      });
  
      // const existingMeeting = [...state.meetings.find(i => {
      //   return i.id === action.payload.id
      // }), ...action.payload];
      // const filtredMeetings = state.meetings.filter(i => {
      //   return i.id !== action.payload.id
      // });
      // setStorageDataListByKey('meetings', ...filtredMeetings, ...existingMeeting);

      // return {
      //   ...state,
      //   meetings: [...filtredMeetings, ...existingMeeting]
      // };
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
