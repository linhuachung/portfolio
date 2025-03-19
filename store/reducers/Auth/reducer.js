import { createSlice } from "@reduxjs/toolkit";
import { AdminLoginAction } from "../../actions/Auth/action.js";

const initialState = {
  login: {
    data: null
  },
  isLoginLoading: false
};

const AuthReducer = createSlice( {
  name: "product",
  initialState,
  reducers: {},
  extraReducers: ( { addCase } ) => {
    addCase( AdminLoginAction.pending, ( state ) => ( {
      ...state,
      isLoginLoading: true,
      login: initialState.login
    } ) );

    addCase( AdminLoginAction.fulfilled, ( state, { payload } ) => ( {
      ...state,
      isLoginLoading: false,
      login: {
        data: payload
      }
    } ) );

    addCase( AdminLoginAction.rejected, ( state ) => ( {
      ...state,
      isLoginLoading: false
    } ) );
  }
} );

const action = AuthReducer.actions;

export { action };

export default AuthReducer.reducer;