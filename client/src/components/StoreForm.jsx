import React from 'react'
import * as yup from 'yup'
import {useFormik} from 'formik'

const StoreForm = ({addStore}) => {
  const formSchema = yup.object().shape({
    storeName: yup.string().required("Store Name is required").max(20),
    description: yup.string(),
    image: yup.string()
  });

  const formik = useFormik({
    initialValues: {
      storeName: "",
      description: "",
      image: "",
    },
    validationSchema: formSchema,
    onSubmit: submitform
  })

  function submitform(values) {
    fetch("/api/storeslist", {
      method: "POST",
      headers: {
         "Content-Type" : "application/json",
          "Accept" : "application/json"
      },
      body: JSON.stringify(values, null, 2),
      })
      .then(resp => resp.json())
      .then(data => addStore(data))
  }
  

  const displayErrors =(error) => {
    return error ? <p style={{color: "red"}}>{error}</p> : null
  }

  return (
    <div className='body'>
    <form onSubmit={formik.handleSubmit}>
      <h1>Create a New Store</h1>
      <div className='formcontainer'>
        <hr />
        <label htmlFor="storeName"><strong>Store Name: </strong></label>
        <input type="text" id="storeName" value={formik.values.storeName} onChange={formik.handleChange} />
        {displayErrors(formik.errors.storeName)}

        <label htmlFor="description"><strong>Description: </strong></label>
        <textarea id="description" cols="55" rows="5" value={formik.values.description} onChange={formik.handleChange}></textarea>
        {displayErrors(formik.errors.description)}

        <label htmlFor="image"><strong>Image URL: </strong></label>
        <input type="text" id="image" value={formik.values.image} onChange={formik.handleChange}/>
        {displayErrors(formik.errors.image)}
        <button type="submit">Add Store </button>
      </div>
    </form>
    </div>
 
  )
}

export default StoreForm
