import dialogsReducer from "./redusers/dialogsRedusers";
import profileReducer from "./redusers/profileRedusers";
import sidebarReducer from "./redusers/sidebarRedusers";

let store={
    _state: {
    profilePage: {
        posts: [{id: 1, message: "Hi", likesCount: 10}, {id: 2, message: "How are you?", likesCount: 10},
            {id: 3, message: "Youoyo", likesCount: 5}
        ],
        newPostText: ''

    },
    dialogsPage: {
        messages: [{id: 1, message: 'HIiiii'}, {id: 2, message: 'How are you?'},
            {id: 3, message: 'Youoyo'}],
        dialogs: [{id: 1, name: 'Yana'}, {id: 2, name: 'Nika'}, {id: 3, name: 'Dima'}]
    },
        newMessageBody:'',
    sidebar:{}
},
    _callSubscriber (){console.log("")},
    getState(){return this._state},
    subscribe (observer){this._callSubscriber=observer},
    dispatch(action){
        this._state.profilePage = profileReducer(this._state.profilePage,action)
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage,action)
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);
            this._callSubscriber(this._state);
                   }
    }


export default store;