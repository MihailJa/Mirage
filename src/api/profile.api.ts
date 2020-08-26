import {ContactsType, PhotosType, ProfileType} from "../Types/types";
import {instance, APIResponseType, ResultCodeEnum, ResultCodeForCaptcha} from "./api";

type SavePhotoResponseType = {
    photos: PhotosType
}

export const profileApi = {
    getProfile(userId: number) {
        return instance.get<ProfileType & ContactsType & PhotosType>(`profile/${userId}`).then(response => response.data)
    },
    getStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`).then(response=>response.data)
    },
    updateStatus(status: string) {
        return instance.put<APIResponseType>(`profile/status`, {status: status}).then(response=>response.data)
    },
    savePhoto(file: File) {
        let formData = new FormData;
        formData.append("image", file)
        return instance.put<APIResponseType<SavePhotoResponseType>>
        (`/profile/photo`, formData, {headers: {'Content-Type': 'multipart//form-data'}}).then(response=>response.data)
    },
    updateProfileData(formData: ProfileType) {
        return instance.put<APIResponseType>(`/profile`, formData).then(response=>response.data)
    }

}