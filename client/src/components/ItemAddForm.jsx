import React, {useState} from 'react'
import * as yup from 'yup'
import {useFormik} from 'formik'

const ItemAddForm = ({addItem, store, setShowItemForm, showItemForm}) => {
  const [error, setError] = useState(null)

  const formSchema = yup.object().shape({
    name: yup.string().required("Item Name is required").min(3),
    description: yup.string(),
    img_url: yup.string(),
    price: yup.number().required("Price is required. Can not be left blank").min(0),
    quantity: yup.number().required("Quantity amount is required. Can not be left blank").min(0)
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      img_url: "",
      price: 0,
      quantity: 0,
      store_id: store.id
    },
    validationSchema: formSchema,
    onSubmit: submitform
  });


  function submitform(values) {
    fetch("/api/items", {
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
            addItem(data);
            setShowItemForm(!showItemForm)
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
      <h1>Create a New Item</h1>
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
        <input type="number" id="price" value={formik.values.price} onChange={formik.handleChange}/>
        {displayErrors(formik.errors.price)}

        <label htmlFor="quantity"><strong>Inventory Amount: </strong></label>
        <input type="number" id="quantity" value={formik.values.quantity} onChange={formik.handleChange}/>
        {displayErrors(formik.errors.quantity)}

        <button type="submit">Add Item </button>
        {displayErrors(error)}
      </div>
    </form>
    </div>
  )
}

export default ItemAddForm
