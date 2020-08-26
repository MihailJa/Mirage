import React from "react";
import style from "./FormControls.module.css";
import {Field, WrappedFieldMetaProps, WrappedFieldProps} from "redux-form";
import {ValidatorType} from "../../utils/validators/validators";
import {LoginFormValuesType} from "../../Login/Login";


type FormControlPropsType = {
    meta: WrappedFieldMetaProps
}


const FormControl:  React.FC<FormControlPropsType> = ({meta, children}) =>{
    debugger
            let hasError = meta.touched && meta.error
        return  <div className={style.formControl + " " + (hasError ? style.error : "")}>
                <div>
                    {children}
                </div>
                {hasError && <span>{meta.error}</span>}
            </div>
}


export const Textarea: React.FC<WrappedFieldProps> = (props)=>{
    let {input, meta,...restprops}  = props
    return <FormControl {...props} ><textarea {...input}  {...restprops}/></FormControl>
}


export const Input: React.FC<WrappedFieldProps> = (props)=>{
    debugger
    let {input, meta, ...restprops}  = props
    return <FormControl {...props}><input {...input}  {...restprops}/></FormControl>
}



export function createField<FormKeysType extends string> (placeholder: string | undefined, name: FormKeysType,
                            validators: Array<ValidatorType>,
                            component:  React.FC<WrappedFieldProps>,
                            type: string, props={}, text="" ) {
 return   <div>
    <Field placeholder={placeholder}
           name={name}
           validate={validators}
           component={component}
           type={type}
           {...props}/>{text}
    </div>
}

export type GetStringKeys<T> = Extract<keyof T, string>