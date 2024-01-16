import React from 'react'
import * as yup from 'yup'
import {useFormik} from 'formik'

const Signup = () => {
    const formSchema = yup.object().shape({
        username: yup.string().required("Must enter a username").max(10),
        password: yup.string().required("Must enter a password").max(15),
        isAdmin: yup.boolean(),
    });

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
            isAdmin: false,
        },
        validationSchema: formSchema,
        onSubmit: submitform
    })

    function submitform(values) {
        fetch("/api/users", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
                "Accept" : "application/json"
            },
            body: JSON.stringify(values, null, 2),
        })
        .then(resp => resp.json())
        .then(data => console.log(data))

    }
  return (
    <form onSubmit={formik.handleSubmit}>
        <label htmlFor='username'>Username</label>
        <input type="text" id="username" name="username" value={formik.values.username} onChange={formik.handleChange}/>
        <br />
        <label htmlFor="password">Password</label>
        <input type="text" name="password" id="password" value={formik.values.password} onChange={formik.handleChange}/>
        <br/>
        <label htmlFor="isAdmin">Admin?</label>
        <input type="radio" id="isAdmin" name="isAdmin" value ={formik.values.isAdmin} onChange={formik.handleChange}/>
        <button type="submit">Submit</button>
    </form>
  )
}

export default Signup
