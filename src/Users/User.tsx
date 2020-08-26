import React from 'react';
import s from './Users.module.css';
import userImg from '../assets/images/user.png';
import {NavLink} from "react-router-dom";
import {UserType} from "../Types/types";


type PropsType = {
    user: UserType
    followingIsProgress: Array<number>
    follow: (userId: number)=>void
    unfollow: (userId: number)=>void
}


const User: React.FC<PropsType> = ({user, followingIsProgress, follow, unfollow}) => {

    return (<div>
                    <div className={s.imgButtonBlock}>
                        <NavLink to={'/profile/'+user.id}>
                            <img src={user.photos.small != null ? user.photos.small : userImg}/>
                        </NavLink>
                        <div>
                            {user.followed ? <button disabled={followingIsProgress.some(id=>id===user.id)}
                                                  onClick={() => unfollow(user.id)}>unfollow</button> :

                                <button disabled={followingIsProgress.some(id=>id===user.id)}
                                        onClick={() => follow(user.id)}>follow</button>}
                        </div>
                    </div>
                    <div className={s.fullname}>
                        <div>{user.name}</div>
                        <div>{user.status}</div>
                    </div>
                    <div className={s.location}>
                        <div>{"u.location.city"}</div>
                        <div>{"u.location.country"}</div>
                    </div>

                </div>
    )
}


export default User;