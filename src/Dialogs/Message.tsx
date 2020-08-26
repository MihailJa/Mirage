import React from 'react';
import s from './Dialogs.module.css';
import {NavLink} from "react-router-dom";

type Propstype ={
    message: string
}

const Message: React.FC<Propstype> = (props) => {
    return (
        <div className={s.message} >
            {props.message}
        </div>

    )
}



export default  Message;