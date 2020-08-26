import React from 'react';
import s from './DescriptionProfileData.module.css';
import {ContactsType, ProfileType} from "../Types/types";

type PropsType = {
    profile: ProfileType
    onEditClick: ()=> void
}

const DescriptionProfileData: React.FC<PropsType> = ({profile, onEditClick}) => {

    return (
        <div className={s.profileData}>
            <button onClick={onEditClick}>Edit</button>

                <div>
                    Full name: {profile.fullName}
                </div>
                <div>
                    Looking for a job: {profile.lookingForAJob ? "Yes" : "No"}
                </div>
                {profile.lookingForAJob &&
                <div>
                   My professional skills: {profile.lookingForAJobDescription}
                </div>
                }
                <div>
                    About me: {profile.aboutMe}
                </div>
                <div>
                    Contacts:
                    { Object.keys(profile.contacts).map(key=>
                        <Contact key={key} contactTitle={key} contactValue={profile.contacts[key as keyof ContactsType] }  />
                    )}

                </div>
        </div>

)
}

type ContactsPropsType={
    contactTitle: string
    contactValue: string
}
const Contact: React.FC<ContactsPropsType> = ({contactTitle, contactValue}) =>{
    return  <>
        <div className={s.contact}><b>{contactTitle}</b>: {contactValue}</div>
    </>

}

export default  DescriptionProfileData;