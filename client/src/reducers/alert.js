import { SET_ALERT, REMOVE_ALERT } from '../actions/types';
// array of objs
const initialStatte = [];
// {
// id
// msg
// alertType
// }

// reducer(state,action) returns a new state
// action has type and payload
export default function alert(state = initialStatte, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_ALERT:
      return [...state, payload];
    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== payload);
    default:
      return state;
  }
}
