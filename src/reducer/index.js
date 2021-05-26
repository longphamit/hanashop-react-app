import { combineReducers } from "redux";
import category from "./category"
import login from "./login"
import user from "./user"
import ui from "./ui"
const appReducer=combineReducers({category,login,user,ui})
export default appReducer