import React from 'react'
import { useNavigate} from 'react-router-dom'
import * as yup from 'yup'
import {useFormik} from 'formik'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'

const Signup = () => {
    const {login} = useContext(UserContext)
    const navigate = useNavigate()

    const formSchema = yup.object().shape({
        username: yup.string().required("Username is required").max(10),
        password: yup.string().required("Password is required"),
        confirmpassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match'),
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
        
        fetch("/api/signup", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
                "Accept" : "application/json"
            },
            body: JSON.stringify(values, null, 2),
        })
        .then(resp => resp.json())
        .then(data => {
            login(data)
            navigate("/")
        })

    }

    const displayErrors =(error) => {
        return error ? <p style={{color: "red"}}>{error}</p> : null
    }

  return (
    <form onSubmit={formik.handleSubmit}>
        <label htmlFor='username'>Username: </label>
        <input type="text" id="username" value={formik.values.username} onChange={formik.handleChange} autoComplete='on'/>
        <br />
        {displayErrors(formik.errors.username)}
        <label htmlFor="password">Password: </label>
        <input type="password" id="password" value={formik.values.password} onChange={formik.handleChange} autoComplete='new-password'/>
        <br/>
        {displayErrors(formik.errors.password)}
        <label htmlFor="confirmpassword">Password Confirmation: </label>
        <input type="password" id='confirmpassword' value={formik.confirmpassword} onChange={formik.handleChange} autoComplete='new-password'/>
        {displayErrors(formik.errors.confirmpassword)}
        <h4>Is Admin?</h4>
        <label htmlFor="yes">YES</label>
        <input type="radio" name="isAdmin" value="yes" id="yes" checked={formik.values.isAdmin == 'yes'} onChange={formik.handleChange}/>
        <label htmlFor="no">NO</label>
        <input type="radio" name="isAdmin" value="no" id="no" checked={formik.values.isAdmin == 'no'} onChange={formik.handleChange}/>
        {displayErrors(formik.errors.isAdmin)}
        <br/>
        <button type="submit">Sign Up</button>
    </form>
  )
}

export default Signup
