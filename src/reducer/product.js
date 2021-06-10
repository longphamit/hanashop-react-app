import {actionType} from "../constant/index"
const initState={
    response:null,
}
const product=(state=initState,action)=>{
    const {type,payload}=action;
    switch(type){
        case actionType.FETCH_PRODUCT:{
            console.log(payload);    
            return {
                ...state,
            }
        }
        case actionType.FETCH_PRODUCT_SUCCESS:{
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
export default product;