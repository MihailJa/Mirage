import React from 'react';
import {useSelector} from 'react-redux';
import {Users} from './UsersC'
import Preloader from "../common/preloader/preloader"
import {getIsFetching} from "../redux/redusers/users-selectors"


type UsersPagePropsType = {
    title: string
}


export const UsersPage: React.FC<UsersPagePropsType> = (props) => {
    const isFetching = useSelector(getIsFetching)
        return (<>
            <h2>{props.title}</h2>
            {isFetching ? <Preloader /> : null}
            <div><Users isFetching={isFetching}/>
            </div>
            </>)

}
