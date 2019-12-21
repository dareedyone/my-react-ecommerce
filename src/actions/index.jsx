import { UPDATE_ITEM } from "../constants/action-type";
import ENDPOINT from "../endpoints";
// import axios from "axios";

export function getItem() {
  return dispatch => {
    ENDPOINT.getItem(response => {
      dispatch({ type: UPDATE_ITEM, payload: response.data });
    });
  };
}

export function addUser(payload) {
  return () => {
    ENDPOINT.register(
      payload.firstname,
      payload.lastname,
      payload.email,
      payload.password1,
      payload.password2,
      response => {
        alert(response.data);
      }
    );
  };
}

export function authenticate() {
  return dispatch => {
    ENDPOINT.verifyToken(response => {
      console.log(response.data.isAuthenticated);
      dispatch({
        type: "UPDATE_AUTHORIZE",
        payload: {
          isAuthenticated: response.data.isAuthenticated
        }
      });
    });
  };
}
