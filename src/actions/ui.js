import {actionType} from "../constant/index"
export const showLoading=()=>({
    type:actionType.SHOW_LOADING,
});
export const hideLoading=()=>({
    type:actionType.HIDE_LOADING
})
export const error=()=>({
    type:actionType.ERROR
})