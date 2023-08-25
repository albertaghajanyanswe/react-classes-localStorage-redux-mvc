/*Auth MODEL Action */

export const AuthAction = {
  addUser: (user) => {
    return dispatch => {
      return dispatch({
        type: "ADD_USER",
        payload: user
      });
    };
  },

  addCurrentUsers: (user) => {
    return dispatch => {
      return dispatch({
        type: "ADD_CURRENT_USER",
        payload: user
      });
    };
  },

  logOut: () => {
    return dispatch => {
      return dispatch({
        type: "LOG_OUT",
        payload: {}
      });
    };
  }
};
