
import usersReducer, {actions, initialStateType} from "./usersReducer";

let state: initialStateType;
beforeEach(()=> state = {
    users: [ {id: 0, name: "Nika 1", followed: false, photos: { small: null, large: null},status: "youyoy"} ,
        {id: 1, name: "Nika 2", followed: true, photos: { small: null, large: null},status: "yo2"},
        {id: 2, name: "Nika 3", followed: true, photos: { small: null, large: null},status: "youyoy3"},
        {id: 3, name: "Nika 4", followed: true, photos: { small: null, large: null},status: "youyoy4"}
    ] ,
    pageSize: 10,
    totalUsersCount: 21,
    currentPage: 1,
    isFetching: true,
    followingIsProgress: []    // array of users id
}
)

test("follow success", ()=>{


  const newState = usersReducer(state, actions.followSuccess(1));

    expect(newState.users[0].followed).toBeFalsy();
    expect(newState.users[1].followed).toBeTruthy();
})

test("unfollow success", ()=>{


    const newState = usersReducer(state, actions.unfollowSuccess(3));

    expect(newState.users[2].followed).toBeTruthy();
    expect(newState.users[3].followed).toBeFalsy();
})