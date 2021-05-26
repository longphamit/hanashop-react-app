import {actionType} from "../constant/index"
const initState={
    response:null,
}
const login=(state=initState,action)=>{
    const {type,payload}=action;
    switch(type){
        case actionType.LOGIN_USER:{
            return {
                ...state,
            }
        }
        case actionType.LOGIN_USER_SUCCESS:{
            return {
                ...state,
                response:payload
            }
        }
        default:{
            return {...state};
        }
    }
}
export default login;