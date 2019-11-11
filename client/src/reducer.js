export default function reducer(state, { type, payload }) { //state and actions. destructured for more readibility
  
  switch(type) {
    case "LOGIN_USER":
      return {
        ...state,
        currentUser: payload,
      }
    case "IS_LOGGED_IN":
      return {
        ...state,
        isAuth: payload,
      }
    case "SIGNOUT_USER":
      return {
        ...state,
        isAuth: false,
        currentUser: null,
      }
    default:
      return state;
  }
}