import {updateObjectInArray} from "../../utils/helpers/object-helpers"
import {UserType} from "../../Types/types"
import {Dispatch} from "redux"
import {AppStateType, BaseThunkType, InferActionsTypes} from "../redux-store"
import {userApi} from "../../api/user.api"
import {APIResponseType} from "../../api/api"

const FOLLOW='network/users/FOLLOW'
const UNFOLLOW='network/users/UNFOLLOW'
const SET_USERS='network/users/SET_USERS'
const SET_CURRENT_PAGE='network/users/SET_CURRENT_PAGE'
const SET_FILTER='network/users/SET_FILTER'
const SET_TOTAL_USERS_COUNT='network/users/SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING='network/users/TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS='network/users/TOGGLE_IS_FOLLOWING_PROGRESS'


let initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 21,
    currentPage: 1,
    isFetching: true,
    followingIsProgress: [] as Array<number> ,  // array of users id
    filter: {
        term: "",
        friend: null as null | boolean
    }
}


const usersReducer=(state=initialState, action: ActionsTypes)=>{
        switch(action.type)
        {
            case FOLLOW:
                return {
                    ...state,
                    users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
                }
            case UNFOLLOW:
                return {
                    ...state,
                    users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
                }
            case SET_USERS:
                return {...state, users: action.users }
            case SET_CURRENT_PAGE:
                return {...state, currentPage: action.pageNumber }
            case SET_FILTER:
                return {...state,  filter: action.filter}
            case SET_TOTAL_USERS_COUNT:
                return {...state, totalUsersCount: action.count }
            case TOGGLE_IS_FETCHING:
                return {...state, isFetching: action.isFetching }
            case TOGGLE_IS_FOLLOWING_PROGRESS:
                return {
                    ...state,
                    followingIsProgress: action.isFetching ?
                        [...state.followingIsProgress, action.userId]
                        : state.followingIsProgress.filter((id)=>id!=action.userId)

                }
            default: return state;
        }
    }


export const actions ={
    followSuccess:(userId: number)=>({type: FOLLOW, userId } as const ),
    unfollowSuccess:(userId: number)=>({type: UNFOLLOW, userId} as const),
    setUsers:(users: Array<UserType>)=>({type: SET_USERS, users} as const),
    setCurrentPage:(pageNumber: number)=>({type: SET_CURRENT_PAGE, pageNumber} as const),
    setFilter: (filter: FilterType)=>({type: SET_FILTER, filter} as const),
    setTotalUsersCount:(count: number)=>({type: SET_TOTAL_USERS_COUNT, count} as const),
    toggleIsFetching:(isFetching: boolean)=>({type: TOGGLE_IS_FETCHING, isFetching} as const),
    toggleFollowingProgress:(isFetching: boolean, userId: number)=>({type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId} as const)
}



type GetStateType = ()=> AppStateType
type DispatchType = Dispatch<ActionsTypes>

export const requestUsers=(currentPage: number, pageSize: number, filter: FilterType)
    : ThunkType => async (dispatch)=> {
    dispatch(actions.toggleIsFetching(true));
    dispatch(actions.setCurrentPage(currentPage))
    dispatch(actions.setFilter(filter))
    let data = await userApi.getUsers(currentPage, pageSize, filter)
        dispatch(actions.toggleIsFetching(false));
        dispatch(actions.setUsers(data.items));
        dispatch(actions.setTotalUsersCount(data.totalCount))
}
const _followUnfollowFlow = async (dispatch: DispatchType, userId: number, apiMethod: (userId: number)=>Promise<APIResponseType>, actionCreator: (userId: number)=> ActionsTypes ) =>{
    dispatch(actions.toggleFollowingProgress(true, userId))
    let data = await apiMethod(userId)
    if (data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(actions.toggleFollowingProgress(false, userId))
}



export const follow=(userId: number)=> async (dispatch: DispatchType)=> {
   await _followUnfollowFlow(dispatch, userId,  userApi.follow.bind(userApi), actions.followSuccess);
}
export const unfollow=(userId: number)=> async (dispatch: DispatchType)=> {
       await _followUnfollowFlow(dispatch, userId, userApi.unfollow.bind(userApi), actions.unfollowSuccess)
    }


export default usersReducer;

export type initialStateType = typeof initialState
export type FilterType = typeof initialState.filter
type ActionsTypes = InferActionsTypes<typeof actions>
type  ThunkType = BaseThunkType<ActionsTypes>