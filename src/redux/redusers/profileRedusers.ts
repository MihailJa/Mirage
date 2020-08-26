import {FormAction, stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType} from "../../Types/types";
import {userApi} from "../../api/user.api";
import {profileApi} from "../../api/profile.api";
import {BaseThunkType, InferActionsTypes} from "../redux-store";

const ADD_POST='network/profile/ADD_POST';
const  SET_USER_PROFILE='network/profile/SET_USER_PROFILE';
const  SET_STATUS='network/profile/SET_STATUS';
const  SAVE_PHOTO_SUCCESS='network/profile/SAVE_PHOTO_SUCCESS';
const  UPDATE_PROFILE_DATA_SUCCESS='network/profile/UPDATE_PROFILE_DATA_SUCCESS'



let initialState= {
        posts: [{id: 1, message: "Hi", likesCount: 10}, {id: 2, message: "How are you?", likesCount: 10},
            {id: 3, message: "Youoyo", likesCount: 5}
        ] as Array<PostType>,
        profile: null as ProfileType | null,
        updateProfileSuccess: false,
        status: ""
}


    const profileReducer=(state=initialState, action: ActionsTypes): initialStateType =>{
        switch(action.type)
        {

            case ADD_POST:
                let message = action.newPostText
                let post = {
                    id: 4, message: message, likesCount: 0
                }
                return {
                    ...state,
                    posts:[...state.posts, post]
                }
            case SET_USER_PROFILE:
                return {
                    ...state,
                    profile: action.profile
                }
            case SET_STATUS:
                return {
                    ...state,
                    status: action.status
                }

            case SAVE_PHOTO_SUCCESS:
                return {
                    ...state,
                    profile: {
                        ...state.profile,
                        photos: action.photos
                    } as ProfileType

                }
            case UPDATE_PROFILE_DATA_SUCCESS:
                    return {
                        ...state,
                        updateProfileSuccess: action.isSuccess
                    }
            default: return state;
        }
    }


   export const actions = {
       addPostActionCreator:(newPostText: string) =>({type: ADD_POST, newPostText} as const),
       setUserProfileAC:(profile: ProfileType | null ) =>({type:SET_USER_PROFILE, profile} as const),
       setStatus:(status: string)=>({type:SET_STATUS, status} as const),
       savePhotoSuccess:(photos: PhotosType)=>({type:SAVE_PHOTO_SUCCESS, photos} as const),
       updateProfileDataSuccess:()=>({type:UPDATE_PROFILE_DATA_SUCCESS, isSuccess:true} as const),
       updateProfileDataSuccessDrop:()=>({type:UPDATE_PROFILE_DATA_SUCCESS, isSuccess:false} as const)
   }


export const getUserProfile=(userId: number): ThunkType=> async (dispath) =>{
      let data = await userApi.getProfile(userId)
            dispath(actions.setUserProfileAC(data))
}

export const getUserStatus=(userId: number): ThunkType=> async (dispath) =>{
    let data = await profileApi.getStatus(userId)
            dispath(actions.setStatus(data))
}

export const updateUserStatus=(status: string): ThunkType=> async (dispath) =>{
    let data = await profileApi.updateStatus(status)
            if(data.resultCode===0) dispath(actions.setStatus(status))
}

export const savePhoto=(file: File): ThunkType=> async (dispatch) =>{
    let data = await profileApi.savePhoto(file)
    if(data.resultCode===0)

        dispatch(actions.savePhotoSuccess(data.data.photos))
}
export const updateProfileData=(formData: ProfileType): ThunkType=> async (dispatch, getState) =>{
    const userId = getState().auth.userId;
    const data = await profileApi.updateProfileData(formData)
    if(data.resultCode===0){
        dispatch(actions.updateProfileDataSuccess())
        if (userId!=null)
        dispatch(getUserProfile(userId))
        else
            throw new Error('userId can`t be null')
        dispatch(actions.updateProfileDataSuccessDrop())
     }else {
        dispatch(stopSubmit("profileForm", {_error: data.messages[0]}))

    }
}

export default profileReducer;

export type initialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes | FormAction>