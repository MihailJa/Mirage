import preloaderImg from '../../assets/images/preloader.svg';
import s from './preloader.module.css'
import React from "react";
type PropsType ={

}
const Preloader: React.FC<PropsType>=(props)=> {
    return (
<div className={s.preloader}>
    <img src={preloaderImg}/>
</div>
    )
}

export default Preloader