import {
  BROKER_AUTH__LOGIN_PENDING,
  BROKER_AUTH__LOGIN_FAIL,
  BROKER_AUTH__LOGIN_SUCCESS,
  BROKER_AUTH__LOGOUT,
} from "./types";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const login = (email, password) => async (dispatch) => {
  dispatch({ type: BROKER_AUTH__LOGIN_PENDING });

  await delay(2000);

  //...fetch
  //we dont have real backend. if you want to make it succeed or fail to see the result.
  const success = true;

  if (success === true) {
    dispatch({
      type: BROKER_AUTH__LOGIN_SUCCESS,
      payload: { token: "dummy token" },
    });
  } else {
    dispatch({
      type: BROKER_AUTH__LOGIN_FAIL,
      payload: {
        errors: {
          email: "email field should not be empty",
        },
      },
    });
  }
};

export const logout = () => async (dispatch) => {
  dispatch({ type: BROKER_AUTH__LOGOUT });
};
