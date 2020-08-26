import {createStore, combineReducers, applyMiddleware, compose, Action} from 'redux';
import dialogsReducer from "./redusers/dialogsRedusers";
import profileReducer from "./redusers/profileRedusers";
import sidebarReducer from "./redusers/sidebarRedusers";
import usersReducer from "./redusers/usersReducer";
import authReduser from "./redusers/auth_reduser";
import appReduser from "./redusers/app_reduser";
import thunkMiddleware, {ThunkAction} from 'redux-thunk';
import {reducer as formReduser} from 'redux-form';

let reducers = combineReducers({
    dialogsPage: dialogsReducer,
    profilePage: profileReducer,
    sidebarReducer: sidebarReducer,
    usersPage: usersReducer,
    auth: authReduser,
    form: formReduser,
    app: appReduser
})

type RootReducerType = typeof reducers;

export type AppStateType = ReturnType<RootReducerType>

export type InferActionsTypes<T> = T extends {[key: string]: (...args: any [])=> infer U } ? U : never

export type BaseThunkType<A extends Action, R = Promise<void>> =  ThunkAction<R, AppStateType, unknown, A>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)))
// @ts-ignore
window.store= store
/*
let store=createStore(reducers, applyMiddleware(thunkMiddleware))
*/

export default store