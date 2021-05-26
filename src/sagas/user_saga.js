import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import request from '../connects/axios_config'
import {actionType} from "../constant/index"
import {showLoading,hideLoading,error}from "../actions/ui"
import {userUrl}from "../connects/url"
function* fetchUser(action){
    try{
        yield put(showLoading())
        const res=yield call(request.post,userUrl.LOGIN,{'loginString':action.payload.loginString,'password':action.payload.password})
        yield put({type:actionType.LOGIN_USER_SUCCESS,payload:res})
    }catch(e){
        console.log(e)
        yield put(error())
    }finally{
        yield put(hideLoading())
    }
}
function* createUser(action){
    try{
        yield put(showLoading())
        const res=yield call(request.post,userUrl.CREATE,action.payload.form)
        yield put({type:actionType.CREATE_USER_SUCCESS,payload:res})
    }catch(e){
        console.log(e)
        yield put(error())
    }finally{
        yield put(hideLoading())
    }
}
function* fetchUsers(action){
    try{
        yield put(showLoading())
        const res=yield call(request.post,userUrl.FETCH,action.payload.searchParam)
        yield put({type:actionType.FETCH_USER_SUCCESS,payload:res})
    }catch(e){
        console.log(e)
        yield put(error())
    }finally{
        yield put(hideLoading())
    }
}
export function* userSaga(){
    yield takeLatest(actionType.LOGIN_USER,fetchUser)
    yield takeLatest(actionType.CREATE_USER,createUser)
    yield takeEvery(actionType.FETCH_USER,fetchUsers)
}