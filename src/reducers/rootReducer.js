import { combineReducers } from "redux";
import searchReducer from "../slices/searchSlice";

const rootReducer = combineReducers({
  search: searchReducer,
});

export default rootReducer;