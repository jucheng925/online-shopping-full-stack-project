import React, {useContext} from 'react'
import * as yup from 'yup'
import {useFormik} from 'formik'
import { UserContext } from '../context/UserContext'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const {login} = useContext(UserContext)
  const navigate = useNavigate()

  const formSchema = yup.object().shape({
      username: yup.string().required("Username is required").max(15).min(3),
      password: yup.string().required("Password is required"),
  });

  const formik = useFormik({
      initialValues: {
          username: "",
          password: "",
      },
      validationSchema: formSchema,
      onSubmit: submitform
  })

  function submitform(values) {
      fetch("/api/login", {
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
          navigate("/stores")
      })

  }

  const displayErrors =(error) => {
      return error ? <p style={{color: "red"}}>{error}</p> : null
  }

return (
  <>
    <form onSubmit={formik.handleSubmit}>
        <label htmlFor='username'>Username: </label>
        <input type="text" id="username" value={formik.values.username} onChange={formik.handleChange} autoComplete='on'/>
        <br />
        {displayErrors(formik.errors.username)}
        <label htmlFor="password">Password: </label>
        <input type="password" id="password" value={formik.values.password} onChange={formik.handleChange} autoComplete='new-password'/>
        <br/>
        {displayErrors(formik.errors.password)}
        <br/>
        <button type="submit">Log In</button>
    </form>
    <p>Not a current user? <Link to="/signup">Signup</Link></p>
  </>
)}

export default Login

