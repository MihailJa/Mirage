
import {getAuthUserData} from "./auth_reduser"
import {InferActionsTypes} from "../redux-store";

const INITIALIZED_SUCCESS='network/app/INITIALIZED_SUCCESS'

let initialState= {
        initialized: false
}

export type initialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>

    const appReduser=(state=initialState, action: ActionsTypes)=>{
        switch(action.type)
        {
            case INITIALIZED_SUCCESS:
                return {
                    ...state,
                    initialized: true
                }

            default: return state;
        }
    }



export const actions = {
   initializedSuccess: () =>({type: INITIALIZED_SUCCESS } as const)
}

export const initializeApp = ()=>(dispatch: any)=> {
    const promise = dispatch(getAuthUserData())
    promise.then(()=>dispatch(actions.initializedSuccess()))

}

export default appReduser;





