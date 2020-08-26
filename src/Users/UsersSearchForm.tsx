import React from 'react'
import {Field, Form, Formik} from "formik"
import {FilterType} from "../redux/redusers/usersReducer";


// @ts-ignore
const usersSearchFormValidate = (values)=>{
        const errors = {}
        return errors;
}

type FormsType= {
  term: string
  friend: "null" | "true" | "false"
}

const UsersSearchForm = React.memo(({onFilterChanged, isFetching}: any)=> {
    debugger
    const submit= (values: FormsType) => {
       const filter: FilterType  ={
           term: values.term,
           friend: values.friend==="null" ? null : values.friend==="true" ? true : false
       }
        onFilterChanged(filter)
    }


    return  <div>
        <Formik
            initialValues={{ term: '', friend: "null"}}
            validate={usersSearchFormValidate}
            onSubmit={submit}
        >
            {(props) => (
                <Form>
                    <Field type="text" name="term" />
                    <Field as="select" name="friend">
                        <option value="null">All</option>
                        <option value="true">Followed</option>
                        <option value="false">Unfollowed</option>
                    </Field>
                    <button type="submit" disabled={isFetching}>
                        Find
                    </button>
                </Form>
            )}
        </Formik>
    </div>
})

export default UsersSearchForm;