import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import request from "../connects/axios_config";
import { actionType } from "../constant/index";
import { showLoading, hideLoading, error } from "../actions/ui";
import { productUrl } from "../connects/url";
function* fetchProduct(action){
    try{
        yield put(showLoading())
        const res=yield call(
            request.post,
            productUrl.FETCH,
            action.payload.searchParam
        )
        yield put({type:actionType.FETCH_PRODUCT_SUCCESS,payload:res})
    }catch(e){
        console.log(e)
        yield put(error())
    }finally{
        yield put(hideLoading())
    }
}
export function* productSaga(){
    yield takeLatest(actionType.FETCH_PRODUCT,fetchProduct)
}