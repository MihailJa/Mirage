import { InferActionsTypes } from "../redux-store";

const SEND_MESSAGE='network/dialogs/SEND_MESSAGE';

export type MessageTypes ={
    id: number
    message: string
}

export type DialogTypes ={
    id: number
    name: string
}

let initialState = {
        messages: [{id: 1, message: 'HIiiii'}, {id: 2, message: 'How are you?'},
            {id: 3, message: 'Youoyo'}] as Array<MessageTypes>,
        dialogs: [{id: 1, name: 'Yana'}, {id: 2, name: 'Nika'}, {id: 3, name: 'Dima'}] as Array<DialogTypes>,

    }



const dialogsReducer=(state=initialState, action: ActionsType): initialStateType=>{
    switch(action.type)
    {
        case SEND_MESSAGE:
            let body= action.newMessageBody;
            return {
                ...state,
                messages: [...state.messages, {id: 6, message: body}]
            };
        default: return state;
    }
}

export const actions = {
    sendMessage: (newMessageBody: string)=> ({type:SEND_MESSAGE, newMessageBody } as const)
}


export default dialogsReducer;


export type initialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>

