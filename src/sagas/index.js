import { all, call, fork, put, takeEvery, takeLatest } from 'redux-saga/effects'
import request from "../connects/axios_config"
import {actionType} from "../constant/index"
import {userSaga} from "../sagas/user_saga"
import {productSaga}from "../sagas/product_saga"
function* rootSaga(){
    yield all(
        [
            userSaga(),
            productSaga()

        ]
    )
}
export default rootSaga