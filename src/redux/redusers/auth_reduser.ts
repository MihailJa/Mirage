import {ResultCodeEnum} from "../../api/api";
import {ActionTypes, stopSubmit} from "redux-form";
import {ThunkAction} from "redux-thunk";
import {AppStateType, BaseThunkType, InferActionsTypes} from "../redux-store";
import {AuthApi} from "../../api/auth.api";
import {securityApi} from "../../api/security.api";
import {Action} from "redux";


const SET_USER_DATA='network/auth/SET_USER_DATA';
const SET_CAPTCHA_URL='network/auth/SET_CAPTCHA_URL';


let initialState = {
        userId: null as number | null,
        email: null as string | null,
        login: null as string | null,
        isAuth: false,
        captchaUrl: null as string | null

}


    const authReduser=(state=initialState, action: ActionsTypes): initialStateType=>{
        switch(action.type)
        {
            case SET_USER_DATA:
            case SET_CAPTCHA_URL:
                return {
                    ...state,
                    ...action.payload
                }

            default: return state;
        }
    }

const actions = {
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) =>({type: SET_USER_DATA, payload:  {userId, email, login, isAuth } } as const),
    setCaptchaUrl: (captchaUrl: string) =>({type: SET_CAPTCHA_URL, payload: {captchaUrl} } as const)
}



export const getAuthUserData = (): ThunkType=> async (dispatch)=>{
    let meData = await AuthApi.me();
            if(meData.resultCode===ResultCodeEnum.Success){
                let {id, email, login} = meData.data
                dispatch(actions.setAuthUserData(id, email, login, true))
            }
    }

export const login = (email: string, password: string, rememberMe: boolean, captcha: string | null)
    : ThunkType=> async (dispatch)=>{
 let data = await  AuthApi.login(email, password, rememberMe, captcha)
            if(data.resultCode===ResultCodeEnum.Success) {
                dispatch(getAuthUserData())
            } else {
                if(data.resultCode===ResultCodeEnum.CaptchaIsRequired){
                    dispatch(getCaptchaUrl())
                }
                let message=data.messages.length>0 ? data.messages[0] : "some error"
                dispatch(stopSubmit("login", {_error: message}))
            }

}

export const getCaptchaUrl = (): ThunkType=> async (dispatch)=>{
    const data = await  securityApi.getCaptchaUrl()
    const captchaUrl = data.url
    dispatch(actions.setCaptchaUrl(captchaUrl))
    }



export const logout = (): ThunkType=> async (dispatch)=>{
       let response = await AuthApi.logout()
            if(response.data.resultCode===ResultCodeEnum.Success){
                dispatch(actions.setAuthUserData(null, null, null, false))
            }
}

export default authReduser;

type initialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes | ReturnType<typeof stopSubmit>>