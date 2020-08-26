import {APIResponseType, GetItemsType, instance} from "./api";
import {profileApi} from "./profile.api";
import {FilterType} from "../redux/redusers/usersReducer";



export const userApi = {
    getUsers(currentPage = 1, pageSize = 10, filter: FilterType) {
            let term = filter["term"] ? `&term=${filter["term"]}`: ""
            let friend = (filter["friend"]!==null && filter["friend"]!==undefined)  ? `&friend=${filter["friend"]}` : ""
        debugger
        return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}` + term + friend)
            .then(response => response.data)
    },
    follow(id: number) {
        return instance.post<APIResponseType>(`follow/${id}`)
            .then(response => response.data)
    },
    unfollow(id: number) {
        return instance.delete<ResponseType>(`follow/${id}`)
            .then(response => response.data) as Promise<APIResponseType>
    },
    getProfile(userId: number) {
        console.warn('Obsolete method. Please profileApi object')
        return profileApi.getProfile(userId)
    }
}