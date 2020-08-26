import {Redirect} from "react-router-dom";
import React from "react";
import {connect} from "react-redux";
import {AppStateType} from "../redux/redux-store";

let mapStateToPropsRedirect = (state: AppStateType)=>({
    isAuth: state.auth.isAuth
})
type MapPropsType = {
    isAuth: boolean
}
export function withAuthRedirect<WCP>(WrappedComponent: React.ComponentType<WCP>){
    const RedirectComponent: React.FC<MapPropsType> = (props) => {
        let {isAuth, ...restprops} = props
        if (!isAuth) return <Redirect to={'/login'}/>
        return <WrappedComponent {...restprops as WCP} />
    }

    let ConnectedAuthRedirectComponent=connect(mapStateToPropsRedirect)(RedirectComponent);
    return ConnectedAuthRedirectComponent;
}