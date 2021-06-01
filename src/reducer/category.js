import { actionType } from "../constant/index"
const initiaState={
    data:[],
}
const category=(state=initiaState,action)=>{
    const {type,payload}=action;
    switch(type){
        case actionType.FETCH_CATEGORY:{
            return{
                ...state,
                data:payload.results,
            }
        }
        case actionType.ADD_CATEGORY:{
            return{
                ...state,
                data:payload.results,
            };
        };
        case actionType.UPDATE_CATEGORY:{
            return{
                ...state,
                data:payload.results,
            };
        };
        case actionType.REMOVE_CATEGORY:{
            return{
                ...state,
                data:payload.results,
            };
        };
        default:{
            return {...state};
        }
    }
}
export default category;