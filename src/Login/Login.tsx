import React from 'react';
import {reduxForm, InjectedFormProps} from 'redux-form';
import {login} from "../redux/redusers/auth_reduser";
import {useDispatch, useSelector} from "react-redux";
import {createField, GetStringKeys, Input} from "../common/FormsControls/FormsControls";
import {requiredField} from "../utils/validators/validators";
import {Redirect} from "react-router-dom";
import style from '../common/FormsControls/FormControls.module.css'
import {AppStateType} from "../redux/redux-store";


type LoginFormOwnProps ={
    captchaUrl: string | null
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> =({handleSubmit, error, captchaUrl})=>{
    return(
        <form onSubmit={handleSubmit}>
            {createField<LoginFormValuesTypeKeys>("login", "email", [requiredField], Input, "")}
            {createField<LoginFormValuesTypeKeys>("password", "password", [requiredField], Input, "password" )}
            {createField<LoginFormValuesTypeKeys>(undefined, "rememberMe", [],Input , "checkbox", {} ,"remember me" )}

            {captchaUrl && <img src={captchaUrl}/> }
            {captchaUrl && createField<LoginFormValuesTypeKeys>("Symbols of captcha", "captcha", [requiredField],Input,  "") }
                {error && <div className={style.formSummaryError}> {error}</div> }
                <div>
                    <button>Login</button>
                </div>

            </form>
    )
}

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({ form: 'login'})(LoginForm);


export type LoginFormValuesType ={
    email: string
    password: string
    rememberMe: boolean
    captcha: string | null
}

type LoginFormValuesTypeKeys = GetStringKeys<LoginFormValuesType>


export const LoginPage: React.FC =(props)=>{
    const isAuth = useSelector((state: AppStateType)=>state.auth.isAuth)
    const captchaUrl = useSelector((state: AppStateType)=>state.auth.captchaUrl)
    const dispatch = useDispatch()
    const onSubmitClick=(formData: LoginFormValuesType)=>{
        dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha))
    }
 if(isAuth){
 return <Redirect to={"/profile"}/>
 }
    return(
        <div>
            <h1>Login</h1>
         <LoginReduxForm onSubmit={onSubmitClick} captchaUrl={captchaUrl}/>
        </div>

    )
}
