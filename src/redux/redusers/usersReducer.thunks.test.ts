import {actions, follow, unfollow} from "./usersReducer";
import {userApi} from "../../api/user.api"
import {APIResponseType, ResultCodeEnum} from "../../api/api";

jest.mock('../../api/user.api')
const UserApiMock = userApi as jest.Mocked<typeof userApi>
const dispatchMock = jest.fn();
const getStateMock = jest.fn();

beforeEach(()=> {
        dispatchMock.mockClear()
        getStateMock.mockClear()
        UserApiMock.follow.mockClear()
        UserApiMock.unfollow.mockClear()
    })

const result: APIResponseType = {
    resultCode: ResultCodeEnum.Success,
    messages: [],
    data: {}
}

UserApiMock.follow.mockReturnValue(Promise.resolve(result))
UserApiMock.unfollow.mockReturnValue(Promise.resolve(result))

test("success follow thunk", async()=>{

const thunk = follow(1);
await thunk(dispatchMock)

    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 1))
})

test("success unfollow thunk", async()=>{

    const thunk = unfollow(1);
    await thunk(dispatchMock)

    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollowSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 1))
})