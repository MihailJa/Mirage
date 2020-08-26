import React from 'react';
import s from './Users.module.css';
import * as axios from "axios";
import userImg from '../assets/images/user.png';



const Users =(props)=> {
    let getUsers = () => {
        if (props.users.length === 0) {
            axios.get("https://social-network.samuraijs.com/api/1.0/users").then(response =>
                props.setUsers(response.data.items));
        }
    }

    return <div>

        <button onClick={getUsers}>Get Users</button>

        {props.users.map((u)=>(
            <div key={u.id} className={s.user}>
            <div className={s.imgButtonBlock}>
                <img src={ u.photos.small!=null?u.photos.small: userImg } />
                {u.followed? <button onClick={()=> {
                    axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, null,
                            {withCredentials: true}).then(response => {
                            if(response.data.resultCode===0){
                                props.follow(u.id)
                            }
                        })
                        }}>follow</button>:
                    <button onClick={()=> {
                        axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, null,
                            {withCredentials: true}).then(response => {
                            if (response.data.resultCode === 0) {
                                props.unfollow(u.id)
                            }

                        })
                    }

                   }>unfollow</button>}
            </div>
            <div className={s.fullname}>
              <div>{u.name}</div>
                <div>{u.status}</div>
            </div>
                <div className={s.location}>
                    <div>{"u.location.city"}</div>
                    <div>{"u.location.country"}</div>
                </div>

            </div>






        )
    )}
    </div>
}

export default Users;