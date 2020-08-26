import React from 'react';
import Post from './Post';
import {InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, requiredField} from "../utils/validators/validators";
import {createField, GetStringKeys, Textarea} from "../common/FormsControls/FormsControls";
import {PostType} from "../Types/types";


const maxLength = maxLengthCreator(10);

export type MapPropsType = {
    posts: Array<PostType>
}

export type DispatchPropsType = {
    addPost: (post: string)=>void
}

const MyPosts: React.FC<MapPropsType & DispatchPropsType> = (props) =>{

    let posts = props.posts.map((p)=><Post message={p.message} likesCount={p.likesCount} /> );
    let onAddPost = (values: AddNewPostFormValuesType) => {
        props.addPost(values.newPostText);
    };


    return (
        <div>
            <div>
            Posts+desc
            </div>
            <div>
            <AddNewPostFormRedux onSubmit={onAddPost} />
            </div>
            {posts}
        </div>

    )
}

type  AddNewPostFormValuesType ={
    newPostText: string
}

type AddNewPostFormOwnProps ={}

type AddNewPostFormTypeKeys = GetStringKeys<AddNewPostFormValuesType>

const AddNewPostForm
    : React.FC<InjectedFormProps<AddNewPostFormValuesType, AddNewPostFormOwnProps> & AddNewPostFormOwnProps> = (props) =>{

    return (
        <form onSubmit={props.handleSubmit}>
            {createField<AddNewPostFormTypeKeys>
            ("Enter message", "newPostText", [requiredField, maxLength], Textarea, "")}
            <button>Add</button>
        </form>

    )
}
const AddNewPostFormRedux = reduxForm<AddNewPostFormValuesType, AddNewPostFormOwnProps>({form: 'profileAddNewPostForm'})(AddNewPostForm);

const MyPostsMemorized = React.memo(MyPosts);
export default  MyPostsMemorized