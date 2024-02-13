import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import {useFormik} from 'formik'

const ItemEditForm = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const item = location.state

  const formSchema = yup.object().shape({
    name: yup.string().required("Item Name is required").min(3),
    description: yup.string(),
    img_url: yup.string(),
    price: yup.number().required("Price is required. Can not be left blank").min(0),
    quantity: yup.number("Quantity amount is required. Can not be left blank").required().min(0)
  });

  const formik = useFormik({
    initialValues: {
      name: item.name,
      description: item.description,
      img_url: item.img_url,
      price: item.price,
      quantity: item.quantity,
    },
    validationSchema: formSchema,
    onSubmit: submitform
  });

  function submitform(values) {
    fetch(`/api/items/${item.id}`, {
      method: "PATCH",
      headers: {
         "Content-Type" : "application/json",
          "Accept" : "application/json"
      },
      body: JSON.stringify(values, null, 2),
      })
      .then(resp => resp.json())
      .then(data => navigate(`/stores/${item.store_id}`))
  }

 const displayErrors =(error) => {
    return error ? <p style={{color: "red"}}>{error}</p> : null
  }

  return (
    <div className='body'>
    <form onSubmit={formik.handleSubmit}>
      <h1>Edit Item</h1>
      <div className='formcontainer'>
        <hr />
        <label htmlFor="name"><strong>Item Name: </strong></label>
        <input type="text" id="name" value={formik.values.name} onChange={formik.handleChange} />
        {displayErrors(formik.errors.name)}

        <label htmlFor="description"><strong>Description: </strong></label>
        <textarea id="description" cols="55" rows="5" value={formik.values.description} onChange={formik.handleChange}></textarea>
        {displayErrors(formik.errors.description)}

        <label htmlFor="img_url"><strong>Image URL: </strong></label>
        <input type="text" id="img_url" value={formik.values.img_url} onChange={formik.handleChange}/>
        {displayErrors(formik.errors.img_url)}

        <label htmlFor="price"><strong>Price($) : </strong></label>
        <input type="text" id="price" value={formik.values.price} onChange={formik.handleChange}/>
        {displayErrors(formik.errors.price)}

        <label htmlFor="quantity"><strong>Inventory Amount: </strong></label>
        <input type="text" id="quantity" value={formik.values.quantity} onChange={formik.handleChange}/>
        {displayErrors(formik.errors.quantity)}

        <button type="submit">Edit Item </button>
      </div>
    </form>
    </div>
  )
}

export default ItemEditForm
