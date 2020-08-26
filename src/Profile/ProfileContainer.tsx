import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    getUserProfile,
    getUserStatus,
    savePhoto,
    updateProfileData,
    updateUserStatus
} from "../redux/redusers/profileRedusers";
import {withRouter, RouteComponentProps} from "react-router-dom";
import {withAuthRedirect} from "../Hoc/withAuthRedirect";
import {compose} from "redux";
import {ProfileType} from "../Types/types";
import {AppStateType} from "../redux/redux-store";



type MapPropsType = {
    profile: ProfileType
    status: string
    authorizedUserId: number | null
    isAuth: boolean
    updateProfileSuccess: boolean
}

type DispatchPropsType = {
    getUserProfile: (userId: number)=>void
    getUserStatus:(userId: number)=>void
    updateUserStatus:(status: string)=>void
    savePhoto:(file: File)=>void
    updateProfileData:(profile: ProfileType)=> Promise<any>
    authorizedUserId: () => void
}
type PathParamsType ={
    userId: string
}


type PropsType = MapPropsType & DispatchPropsType & RouteComponentProps<PathParamsType>;

class ProfileContainer extends React.Component<PropsType> {
       refreshProfile (){
        let id: number | null = +this.props.match.params.userId;
        if(!id){
            id=this.props.authorizedUserId;
            if(!id){
                this.props.history.push("/login")
            }
        }
        this.props.getUserProfile(id as number);
        this.props.getUserStatus(id as number);
    }
    componentDidMount() {
        this.refreshProfile();
    }
   componentDidUpdate(prevProps: PropsType, prevState:PropsType) {
        if(prevProps.match.params.userId!= this.props.match.params.userId)
            this.refreshProfile();
   }

    render(){

            return (
                <Profile {...this.props}
                         profile={this.props.profile as ProfileType}
                         status={this.props.status}
                         updateUserStatus={this.props.updateUserStatus}
                         isOwner={!this.props.match.params.userId}
                         savePhoto={this.props.savePhoto}
                        /* authorizedUserId={this.props.authorizedUserId}*//>
    )
    }
}
let mapStateToProps=(state: AppStateType)=>({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
    updateProfileSuccess: state.profilePage.updateProfileSuccess

})

export default compose<React.ComponentType>(
    withAuthRedirect,
    withRouter,
    connect(mapStateToProps, {getUserProfile, getUserStatus, updateUserStatus, savePhoto, updateProfileData})
)(ProfileContainer)