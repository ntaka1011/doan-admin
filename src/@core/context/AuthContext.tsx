
import React, { ReactNode, createContext, useEffect, useReducer } from "react";

enum AuthActionKind {
  LOGIN_START = "LOGIN_START",
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  LOGIN_FAILURE = "LOGIN_FAILURE",
  LOGOUT = "LOGOUT",
}

// An interface for our actions
interface AuthAction {
  type: AuthActionKind;
  payload: any;
}

interface AuthState {
  user: any;
  dispatch?: any;
}

const INITIAL_STATE: AuthState = {
  user:
    typeof localStorage !== "undefined"
      ? JSON.parse(localStorage.getItem("user") as string)
      : null,
  dispatch: null,
};

export const AuthContext = createContext(INITIAL_STATE);

const authReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
      };
    case "LOGOUT":
      return {
        user: null,
      };

    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);


  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
