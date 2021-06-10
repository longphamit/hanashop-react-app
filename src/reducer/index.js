import { combineReducers } from "redux";
import login from "./login"
import user from "./user"
import ui from "./ui"
import product from "./product"
const appReducer=combineReducers({login,user,ui,product})
export default appReducer