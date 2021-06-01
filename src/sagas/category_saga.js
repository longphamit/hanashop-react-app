import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { actionType } from "../constant/index";
import request from "../connects/axios_config";
import { showLoading, hideLoading, error } from "../actions/ui";
import { categoryUrl } from "../connects/url";

function* fetchCategory(action){
    try{
        yield put(showLoading())
        const res=yield call(request.post,categoryUrl.FETCH)
        yield put({type:actionType.FETCH})
    }catch(e){
        console.log(e)
        yield put(error());
    }finally{
        yield put(hideLoading())
    }
}