import {actionType} from "../constant/index"
export const login=(form)=>({
    type:actionType.LOGIN_USER,
    payload:{
        loginString:form.email,
        password:form.password
    }
});
export const createUser=(form)=>({
    type:actionType.CREATE_USER,
    payload:{
        form:form
    }
});
export const getUser=(searchParam)=>({
    type:actionType.FETCH_USER,
    payload:{
        searchParam:searchParam
    }
})