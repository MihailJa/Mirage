import axios from 'axios';
import {UserType} from "../Types/types";


export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers:{
        "API-KEY":"1d81b50b-fdd8-41d0-b074-a7b4304f92be"
    }
})

export enum ResultCodeEnum {
    Success = 0,
    Error =1,
    CaptchaIsRequired=10
}
export enum ResultCodeForCaptcha {
    CaptchaIsRequired=10
}


export type GetItemsType={
    items: Array<UserType>
    totalCount: number
    error: string | null
}


export type APIResponseType<D = {}, RC = ResultCodeEnum> = {
    data: D
    messages: Array<string>
    resultCode: RC
}