import {combineReducers, createStore} from "redux";
import appReducer from "./app-reducer";

const rootReducer = combineReducers({
  timerData : appReducer
})
export const store = createStore(rootReducer);