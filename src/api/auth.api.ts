import {instance, APIResponseType, ResultCodeForCaptcha} from "./api"

type LoginMeResponseType ={
    data: {userId: number}
}
export type MeResponseType ={
    id: number
    email: string
    login: string
}

export const AuthApi = {
    me() {
        return instance.get<APIResponseType<MeResponseType>>(`auth/me`).then(response => response.data)
    },
    login(email: string, password: string, rememberMe = false, captcha: null | string) {
        return instance.post<APIResponseType<LoginMeResponseType>>(`auth/login`, {email, password, rememberMe, captcha})
            .then(response => response.data)
    },
    logout() {
        return instance.delete(`auth/login`)
    }
}