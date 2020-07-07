import { v4 as uuidv4 } from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';

export const setAlert = (msg, alertType) => (dispatch) => {
  const id = uuidv4();
  //   dispatch (action), action = {type, payload}
  //   payload to set an alert : id, msg, alertType
  dispatch({
    type: SET_ALERT,
    payload: { id, msg, alertType },
  });
};
