import React from 'react';
import {connect} from 'react-redux';
import {actions} from "../redux/redusers/dialogsRedusers";
import Dialogs from "./Dialogs";
import {withAuthRedirect} from "../Hoc/withAuthRedirect";
import {compose} from "redux";
import {AppStateType} from "../redux/redux-store";


const mapStateToProps =(state: AppStateType)=>{
    return {dialogsPage: state.dialogsPage
    }
}

const DialogsContainer = compose<React.ComponentType>(
    connect(mapStateToProps, {onSendMessage: actions.sendMessage}),
    withAuthRedirect
)(Dialogs)

export default  DialogsContainer;