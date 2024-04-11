import React, { useState, useContext } from 'react'
import { UserContext } from '../context/UserContext'
import * as yup from 'yup'
import {useFormik} from 'formik'

const StoreForm = ({addStore}) => {
  const {contextAddStore} = useContext(UserContext)
  const [error, setError] = useState()

  const formSchema = yup.object().shape({
    store_name: yup.string().required("Store Name is required").max(20),
    description: yup.string(),
    img_url: yup.string()
  });

  const formik = useFormik({
    initialValues: {
      store_name: "",
      description: "",
      img_url: "",
    },
    validationSchema: formSchema,
    onSubmit: submitform
  })

  function submitform(values) {
    fetch("/api/stores", {
      method: "POST",
      headers: {
         "Content-Type" : "application/json",
          "Accept" : "application/json"
      },
      body: JSON.stringify(values),
      })
      .then(resp => {
        if (resp.ok) {
          resp.json().then(data => {
            addStore(data);
            contextAddStore(data)
          })
        } else {
          resp.json().then((err)=> setError(err.error))
        }
      })
  }
  
  const displayErrors =(error) => {
    return error ? <p style={{color: "red"}}>{error}</p> : null
  }

  return (
    <div className='body'>
      <form onSubmit={formik.handleSubmit}>
        <h1>Create a New Store</h1>
        {displayErrors(error)}
        <div className='formcontainer'>
          <hr />
          <label htmlFor="store_name"><strong>Store Name: </strong></label>
          <input type="text" id="store_name" value={formik.values.store_name} onChange={formik.handleChange} />
          {displayErrors(formik.errors.store_name)}

          <label htmlFor="description"><strong>Description: </strong></label>
          <textarea id="description" cols="55" rows="5" value={formik.values.description} onChange={formik.handleChange}></textarea>
          {displayErrors(formik.errors.description)}

          <label htmlFor="img_url"><strong>Image URL: </strong></label>
          <input type="text" id="img_url" value={formik.values.img_url} onChange={formik.handleChange}/>
          {displayErrors(formik.errors.img_url)}
        
          <button type="submit"> Add Store </button>
          {displayErrors(error)}
        </div>
      </form>
    </div>
  )
}

export default StoreForm
