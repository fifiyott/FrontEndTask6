import productReducer from "./productReducers";
import { combineReducers } from "redux";
import userReducer from "./userReducers";

export default combineReducers({
  Products: productReducer,
  Users: userReducer,
});