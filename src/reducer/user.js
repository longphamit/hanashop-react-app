import {actionType} from "../constant/index"
const initState={
    response:null,
}
const user=(state=initState,action)=>{
    const {type,payload}=action;
    switch(type){
        case actionType.FETCH_USER:{
            return {
                ...state,
            }
        }
        case actionType.FETCH_USER_SUCCESS:{
            console.log(payload)
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
export default user;