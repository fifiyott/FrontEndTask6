import productReducer from "./productReducers";
import { combineReducers } from "redux";


export default combineReducers({
  Products: productReducer,
});