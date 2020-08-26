import React from 'react';
import s from './Profile.module.css';
import DescriptionProfile from './DescriptionProfile';
import MyPostsContainer from "./MyPostsContainer";
import {ProfileType} from "../Types/types";
type PropsType ={
    profile: ProfileType
    status: string
    updateUserStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File)=> void
    updateProfileData: (profile: ProfileType)=> void
    updateProfileSuccess: boolean
}
const Profile: React.FC<PropsType> = (props) => {
    return (
        <div>
            <div className={s.profile}>
              <DescriptionProfile profile={props.profile} status={props.status}
                                  updateUserStatus={props.updateUserStatus} isOwner={props.isOwner}
                                  savePhoto={props.savePhoto}
                                  updateProfileData={props.updateProfileData}
                                  updateProfileSuccess={props.updateProfileSuccess}/>
           <MyPostsContainer />
            </div>
        </div>
    )
}

export default  Profile;