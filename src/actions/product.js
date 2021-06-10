import {actionType} from "../constant/index"
export const getProduct=(searchParam)=>({
    type:actionType.FETCH_PRODUCT,
    payload:{
        searchParam:searchParam
    }
})
