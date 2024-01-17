import React from 'react'
import * as yup from 'yup'
import {useFormik} from 'formik'

const Signup = () => {
    const formSchema = yup.object().shape({
        username: yup.string().required("Must enter a username").max(10),
        password: yup.string().required("Must enter a password").max(15),
        isAdmin: yup.string().oneOf(["yes", "no"]).required("Please select one")
    });

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
            isAdmin: '',
        },
        validationSchema: formSchema,
        onSubmit: submitform
    })

    function submitform(values) {
        values.isAdmin == 'yes' ?
            values.isAdmin = true :
            values.isAdmin = false;
        
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
        <h4>Is Admin?</h4>
        <label htmlFor="yes">YES</label>
        <input type="radio" name="isAdmin" value="yes" id="yes" checked={formik.values.isAdmin == 'yes'} onChange={formik.handleChange}/>
        <label htmlFor="no">NO</label>
        <input type="radio" name="isAdmin" value="no" id="no" checked={formik.values.isAdmin == 'no'} onChange={formik.handleChange}/>
        <button type="submit">Submit</button>
    </form>
  )
}

export default Signup
