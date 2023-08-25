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

  editMeeting: (editedMeeting) => {
    return dispatch => {
      return dispatch({
        type: "EDIT_MEETING",
        payload: editedMeeting
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
