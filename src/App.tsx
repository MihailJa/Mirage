import React from 'react';
import {Layout} from "antd";
import  './App.css';
import Navbar from './Navbar/Navbar';
import {HashRouter, Redirect, Route, Switch, withRouter} from "react-router-dom";
import {UsersPage} from "./Users/UsersContainer";
import HeaderContainer from "./Header/HeaderContainer";
import {LoginPage} from "./Login/Login";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/redusers/app_reduser";
import Preloader from "./common/preloader/preloader";
import store, {AppStateType} from "./redux/redux-store";
import {withSuspense} from "./Hoc/withSuspense";
import Footer from "./Footer/Footer";
const DialogsContainer = React.lazy(()=> import ('./Dialogs/DialogsContainer'))
const ProfileContainer = React.lazy(()=> import ('./Profile/ProfileContainer'))

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    initializeApp: ()=> void
}

const SuspendedDialogs = withSuspense(DialogsContainer)
const SuspendedProfile = withSuspense(ProfileContainer)

class App extends React.Component<MapPropsType & DispatchPropsType> {
    catchAllUnhandledErrors=(e:PromiseRejectionEvent)=>{
        alert("SOme error occured")
        console.error(e)
    }
  componentDidMount(){
      window.addEventListener("unhandledrejection" ,  this.catchAllUnhandledErrors)
  this.props.initializeApp();
  }
 componentWillUnmount(){
     window.removeEventListener("unhandledrejection" ,  this.catchAllUnhandledErrors)
 }

  render() {
    if(!this.props.initialized){
      return  <Preloader/>
    }
    return (
        <Layout>
        {  /* <div className='container'> */ }

            <HeaderContainer/>
            <Layout>
                <Navbar/>
                <Layout.Content>
                    <Switch>
                        <Route exact path='/' render=
                            {() => <Redirect to={"/profile"}/>}/>
                        <Route path='/dialogs' render={() => <SuspendedDialogs />}/>
                        <Route path='/profile/:userId?' render={() => <SuspendedProfile/>}/>
                        <Route path='/users' render={() => <UsersPage title="Users"/>}/>
                        <Route path='/login' render={() => <LoginPage/>}/>
                        <Route path='*' render=
                            {() => <div>404 NOT FOUND</div>}/>
                    </Switch>
                    </Layout.Content>
            </Layout>
            <Footer/>

            { /* <HeaderContainer/>
          <Navbar/>
          <div className='app-wrap-content'>
              <Switch>
                      <Route exact path='/' render=
                      {() => <Redirect to={"/profile"}/>}/>
                      <Route path='/dialogs' render={() => <SuspendedDialogs />}/>
                      <Route path='/profile/:userId?' render={() => <SuspendedProfile/>}/>
                      <Route path='/users' render={() => <UsersContainer title="Users"/>}/>
                      <Route path='/login' render={() => <Login/>}/>
                      <Route path='*' render=
                      {() => <div>404 NOT FOUND</div>}/>

              </Switch>
          </div>*/}
      { /*</div>*/}
        </Layout>
    );
  }
}

const mapStateToProps =(state: AppStateType) => ({
  initialized: state.app.initialized
})

const AppContainer = compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeApp})
)(App)

const MainApp: React.FC = () =>{
  return  <HashRouter>
        <Provider store={store}>
            <AppContainer />
        </Provider>
    </HashRouter>
}


export default MainApp;