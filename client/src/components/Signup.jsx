import React, { useState, useContext } from 'react'
import { useNavigate} from 'react-router-dom'
import * as yup from 'yup'
import {useFormik} from 'formik'
import { UserContext } from '../context/UserContext'


const Signup = () => {
    const [error, setError] = useState(null)
    const {login} = useContext(UserContext)
    const navigate = useNavigate()

    const formSchema = yup.object().shape({
        username: yup.string().required("Username is required").max(15).min(3),
        password: yup.string().required("Password is required"),
        confirmpassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match'),
        isAdmin: yup.string().oneOf(["yes", "no"]).required("Please select one")
    });

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
            confirmpassword: "",
            isAdmin: '',
        },
        validationSchema: formSchema,
        onSubmit: submitform
    })

    const checkBackendErrors = (data) => {
        if (data.error) {
            setError(data.error)
        } else {
            login(data)
            navigate("/stores")
        }
    }

    function submitform(values) {
        setError(null)
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
            checkBackendErrors(data)
        })

    }

    const displayErrors =(error) => {
        return error ? <p style={{color: "red"}}>{error}</p> : null
    }

  return (
    <div className='body'>
    <form onSubmit={formik.handleSubmit}>
    <h1>SignUp</h1>
    <div className='formcontainer'>
        <hr />
        {displayErrors(error)}
        <div className='container'>
            <label htmlFor='username'><strong>Username: </strong></label>
            <input type="text" id="username" value={formik.values.username} onChange={formik.handleChange} autoComplete='on'/>
            {displayErrors(formik.errors.username)}

            <label htmlFor="password"><strong>Password: </strong></label>
            <input type="password" id="password" value={formik.values.password} onChange={formik.handleChange} autoComplete='new-password'/>
            {displayErrors(formik.errors.password)}

            <label htmlFor="confirmpassword"><strong>Password Confirmation: </strong></label>
            <input type="password" id='confirmpassword' value={formik.values.confirmpassword} onChange={formik.handleChange} autoComplete='new-password'/>
            {displayErrors(formik.errors.confirmpassword)}
        </div>
        <div className='container'>
            <label><strong>Is Admin?     </strong></label>

            <label htmlFor="yes" className='radio'>YES</label>
            <input type="radio" className='radio' name="isAdmin" value="yes" id="yes" checked={formik.values.isAdmin == 'yes'} onChange={formik.handleChange}/>
            <label htmlFor="no" className='radio'>NO</label>
            <input type="radio" className='radio' name="isAdmin" value="no" id="no" checked={formik.values.isAdmin == 'no'} onChange={formik.handleChange}/>            
            {displayErrors(formik.errors.isAdmin)}
        </div>
        <button type="submit">Sign Up</button>
    </div>
    </form>
    </div>
  )
}

export default Signup
