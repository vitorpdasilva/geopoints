export default function reducer(state, { type, payload }) { //state and actions. destructured for more readibility
  
  switch(type) {
    case "LOGIN_USER":
      return {
        ...state,
        currentUser: payload,
      }
    default:
      return state;
  }
}