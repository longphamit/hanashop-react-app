import { all, call, fork, put, takeEvery, takeLatest } from 'redux-saga/effects'
import request from "../connects/axios_config"
import {actionType} from "../constant/index"
import {userSaga} from "../sagas/user_saga"
function* rootSaga(){
    yield all(
        [
            userSaga()
        ]
    )
}
export default rootSaga