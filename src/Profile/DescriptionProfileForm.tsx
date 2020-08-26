import React from 'react';
import s from './DescriptionProfileData.module.css';
import {Form, formValueSelector, InjectedFormProps, reduxForm} from "redux-form";
import {createField, GetStringKeys, Input, Textarea} from "../common/FormsControls/FormsControls";
import {connect} from "react-redux";
import style from "../common/FormsControls/FormControls.module.css";
import {ProfileType} from "../Types/types";


type PropsType ={
    hasLookingJob: boolean
    profile: ProfileType
}
type ProfileTypeKeys = GetStringKeys<ProfileType>

let DescriptionProfileForm: React.FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = ({handleSubmit, hasLookingJob, profile, error}) => {

    return (
        <Form onSubmit={handleSubmit} >
            <button type="submit" >Submit</button>
            {error && <div className={style.formSummaryError}> {error}</div> }
                <div>
                    Full name:
                    {createField<ProfileTypeKeys>("name", "fullName",
                        [], Input,"", ""  )}
                </div>
                <div>
                    Looking for a job:
                    {createField<ProfileTypeKeys>("", "lookingForAJob",
                        [], Input,"checkbox", ""  )}
                </div>
                { hasLookingJob &&
                <div>
                   My professional skills:
                    {createField<ProfileTypeKeys>("name", "lookingForAJobDescription",
                    [], Textarea,"", ""  )}
                </div>
                }
                <div>
                     About me:
                    {createField<ProfileTypeKeys>("name", "aboutMe",
                        [], Textarea,"", ""  )}
                </div>
                <div>
                    Contacts:
                    { Object.keys(profile.contacts).map(key=>{
                      return  <div key={key} className={s.contact}>
                          <b>{key}: </b> {createField(key, `contacts.${key}`, [],Input, "", "")}
                      </div>}
                    )}
                </div>
        </Form>

)
}
const DescriptionProfileFormRedux = reduxForm<ProfileType, PropsType>({form: "profileForm"})(DescriptionProfileForm);

const selector = formValueSelector('profileForm')
DescriptionProfileForm = connect(state => {
    // can select values individually
    const hasLookingJob = selector(state, 'lookingForAJob')
    return {
        hasLookingJob
    }
})(DescriptionProfileForm)

export default  DescriptionProfileFormRedux;