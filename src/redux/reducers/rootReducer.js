import { combineReducers } from "redux";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
  auth: authReducer, // 'auth' is the key where the authentication state will be stored in the Redux store
  // Add other reducers here if needed
});

export default rootReducer;
