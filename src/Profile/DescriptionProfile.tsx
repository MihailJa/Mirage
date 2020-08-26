import React, {ChangeEvent, useEffect, useState} from 'react';
import s from './DescriptionProfile.module.css';
import Preloader from "../common/preloader/preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHook";
import userPhoto from "./../assets/images/user.png";
import DescriptionProfileData from "./DescriptionProfileData";
import DescriptionProfileForm from "./DescriptionProfileForm";
import {ProfileType} from "../Types/types";
import {Card} from "antd";

type PropsType ={
    profile: ProfileType
    status: string
    updateUserStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File)=> void
    updateProfileData: (profile: ProfileType)=> void
    updateProfileSuccess: boolean
}

const DescriptionProfile: React.FC<PropsType> = ({profile, status, updateUserStatus, isOwner, savePhoto, updateProfileData, updateProfileSuccess}) => {

    let [editMode, setEditMode] = useState(false);
    useEffect(()=>{setEditMode(false)},[updateProfileSuccess])
    const onSubmitProfileForm = (formData: ProfileType)=>{
        updateProfileData(formData);
    }
   const onChangeMainPhoto = (e: ChangeEvent<HTMLInputElement> ) =>{
       if(e.target.files?.length){
           savePhoto(e.target.files[0]);
       }

   }
   const onEditClick=()=>{
       setEditMode(true);
   }
    if(!profile){
        return <Preloader />
}

    // @ts-ignore
    // @ts-ignore
    return (
            <div className={s.container}>
            <div className={s.mainPhoto}>
                      <img src={profile.photos.large || userPhoto} alt="avatar" />
                {isOwner && <div className={s.inputFile}><label htmlFor="file">Change photo<input className={s.input} type={"file"} id="file" onChange={onChangeMainPhoto}/> </label></div>}
                       
                </div>
                <div className={s.description}>
                {(isOwner && editMode) ? // @ts-ignore
                    <DescriptionProfileForm initialValues={profile} onSubmit={onSubmitProfileForm} profile={profile}/> :
               <DescriptionProfileData profile={profile} onEditClick={onEditClick}/>}
                <ProfileStatusWithHooks  status={status} updateUserStatus={updateUserStatus}/>
                    </div>
            </div>
    )
}



export default  DescriptionProfile;