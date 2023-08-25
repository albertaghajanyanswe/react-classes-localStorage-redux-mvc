/*Auth MODEL Action */

export const MeetingAction = {
  addMeeting: (meetings, ownerId) => {
    return dispatch => {
      return dispatch({
        type: "ADD_MEETING",
        payload: {meetings, ownerId}
      });
    };
  },

  editMeeting: (meetings, ownerId) => {
    return dispatch => {
      return dispatch({
        type: "EDIT_MEETING",
        payload: {meetings, ownerId}
      });
    };
  },

  deleteMeeting: (meeting) => {
    return dispatch => {
      return dispatch({
        type: "DELETE_MEETING",
        payload: meeting
      });
    };
  },

};
