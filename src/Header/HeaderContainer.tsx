import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {logout} from "../redux/redusers/auth_reduser";
import {AppStateType} from "../redux/redux-store";


type MapStateType = {
    isAuth: boolean
    login: string | null
}

type MapDispatchType = {
    logout: ()=> void
}

type OwnType ={

}
type HeaderType = MapStateType & MapDispatchType & OwnType


class HeaderContainer extends React.Component<HeaderType> {


    render(){
    return <div>
            <Header {...this.props}/>
    </div>

    }
}

const mapStateToProps=(state: AppStateType)=>(
    {
        isAuth: state.auth.isAuth,
            login: state.auth.login
    }
)


export default  connect<MapStateType, MapDispatchType, OwnType, AppStateType>(mapStateToProps, {logout})(HeaderContainer);