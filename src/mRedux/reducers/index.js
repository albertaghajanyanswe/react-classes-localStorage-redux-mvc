import { combineReducers } from "redux";
import auth from "./AuthReducer";
import meetings from "./MeetingReducer";


export default combineReducers({
  auth,
  meetings
});