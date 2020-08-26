import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from './DialogItem';
import Message from './Message';
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, Textarea} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, requiredField} from "../utils/validators/validators";
import {DialogTypes, MessageTypes} from "../redux/redusers/dialogsRedusers";


const maxLength = maxLengthCreator(100);

type DialogsPropsType={
    dialogsPage: {dialogs: Array<DialogTypes>,  messages: Array<MessageTypes>}
    handleSubmit: ()=> void
    onSendMessage: (newMessageBody: string)=> void
}

export type NewMessageFormType ={
    newMessageBody: string

}


const Dialogs: React.FC<DialogsPropsType> = (props) => {
    debugger;
        let dialogs = props.dialogsPage.dialogs.map((d)=> <DialogItem name={d.name} id={d.id}/>);
    let messages = props.dialogsPage.messages.map((m)=>  <Message message={m.message}/>);


let onSendMessageClick = (value: { newMessageBody: string }) => {
      props.onSendMessage(value.newMessageBody);
    }
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogs}
            </div>
            <div className={s.messages}>
              <div>{messages}</div>
                 <AddNewMessageRedux onSubmit={onSendMessageClick} />
            </div>
        </div>
    )
}

type NewMessageFormTypeKeys = Extract<keyof NewMessageFormType, string>
type PropsType={}
const AddNewMessage: React.FC<InjectedFormProps<NewMessageFormType & PropsType> & PropsType>= (props) => {
 return (
     <form onSubmit={props.handleSubmit}>
         {createField<NewMessageFormTypeKeys>
         ("enter your message", "newMessageBody", [requiredField, maxLength], Textarea, "")}

         <button>Send</button>
     </form>
 )
}

const AddNewMessageRedux= reduxForm<NewMessageFormType & PropsType>({form:"addNewMessage"})(AddNewMessage);

export default  Dialogs;

