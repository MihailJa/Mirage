import profileReducer, {addPostActionCreator} from "./profileRedusers";

let state= {
    posts: [{id: 1, message: "Hi", likesCount: 10},
        {id: 2, message: "How are you?", likesCount: 10},
        {id: 3, message: "Youoyo", likesCount: 5}
    ]
}

it('posts length should be incremented',()=>{
let newPost = "YouYou";


let action = addPostActionCreator(newPost);
let newState = profileReducer(state,action);

expect(newState.posts.length).toBe(4);

});

it('new posts should be correct',()=>{
    let newPost = "How are you?";

    let action = addPostActionCreator(newPost);
    let newState = profileReducer(state,action);

    expect(newState.posts[3].message).toBe("How are you?");

});


