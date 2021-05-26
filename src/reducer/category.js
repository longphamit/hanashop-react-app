import { actionType } from "../constant/index"
const initiaState={
    categories:[],
    totalPage:null
}
const category=(state=initiaState,action)=>{
    const {type,payload}=action;
    switch(type){
        case actionType.FETCH_CATEGORY:{
            return{
                ...state,
                categories:payload.results,
                totalPage:payload.total
            }
        }
        case actionType.ADD_CATEGORY:{
            return{
                ...state,
                categories:payload.results,
                totalPage:payload.total,
            };
        };
        case actionType.UPDATE_CATEGORY:{
            return{
                ...state,
                categories:payload.results,
                totalPage:payload.total,
            };
        };
        case actionType.REMOVE_CATEGORY:{
            return{
                ...state,
                categories:payload.results,
                totalPage:payload.total,
            };
        };
        default:{
            return {...state};
        }
    }
}
export default category;