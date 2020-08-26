import React from 'react';
import s from './Post.module.css';

type PropsType ={
    message: string
    likesCount:  number
}
const Post: React.FC<PropsType> = (props) => {
    return (
        <div className={s.post}>
            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTjFuRKL7FBeTCFDumTAxgm3D7JtHmGeRo5ML4rTEKJq482e2T9&usqp=CAU'/>
            <span>{props.message}</span>
            <br/>
            <span>likest:</span> {props.likesCount}
        </div>
    )
}



export default  Post;