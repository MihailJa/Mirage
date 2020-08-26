import React, {useEffect} from 'react';
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import UsersSearchForm from "./UsersSearchForm";
import {actions, FilterType, follow, requestUsers, unfollow} from "../redux/redusers/usersReducer";
import {
    getCurrentPage,
    getFilter, getFollowingIsProgress,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from "../redux/redusers/users-selectors";
import {useDispatch, useSelector} from "react-redux";

type PropsType ={
    isFetching: boolean
}


export const Users: React.FC<PropsType> = (props) => {
    const users = useSelector(getUsers)
    const currentPage = useSelector(getCurrentPage)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getFilter)
    const followingIsProgress = useSelector(getFollowingIsProgress)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(requestUsers(currentPage, pageSize, {term: "", friend: null}))
    }, [])

    const onPageChanged = (pageNumber: number) => {
        dispatch(actions.setCurrentPage(pageNumber))
        dispatch(requestUsers(pageNumber, pageSize, filter))
    }

    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter))
    }
    const followCallback = (userId: number) => {
        dispatch(follow(userId))
    }
    const unfollowCallback  = (userId: number) => {
        dispatch(unfollow(userId))
    }


    return <div>
        <UsersSearchForm onFilterChanged={onFilterChanged} isFetching={props.isFetching}/>
        <Paginator currentPage={currentPage}
                   portionSize={10}
                   onPageChanged={onPageChanged}
                   totalItemsCount={totalUsersCount}
                   pageSize={pageSize}/>
        {users.map((u:any) => <User user={u}
                                followingIsProgress={followingIsProgress}
                                follow={followCallback}
                                    unfollow={unfollowCallback}
                                key={u.id}/>)}
    </div>
}