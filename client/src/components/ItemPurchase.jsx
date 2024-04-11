import React, {useContext} from 'react'
import * as yup from 'yup'
import {useFormik} from 'formik'
import { UserContext } from '../context/UserContext'

import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import StyledButton from '../StyledButton';


const ItemPurchase = ({item, onUpdateItem}) => {
  const {contextAddPurchase}= useContext(UserContext)

  const formSchema = yup.object().shape({
    input_quantity: yup.number().min(1).max(item.quantity).required("Please input a quantity or cancel transaction.")
  });

  const formik = useFormik({
    initialValues: {
      input_quantity: 1
    },
    validationSchema: formSchema,
    onSubmit: submitform
  });

  function submitform(values){
    fetch('/api/purchases', {
      method: "POST",
      headers: {
        "Content-Type" : "application/json",
        "Accept" : "application/json"
      },
      body: JSON.stringify({
        item_id : item.id,
        quantity: values.input_quantity,
        amt_spent: item.price * values.input_quantity
        }),
    })
      .then(resp => resp.json())
      .then((data) => {
        contextAddPurchase(data);
        handleInventory(data.item, values.input_quantity);
        window.alert("Thank you for purchasing!!");
        formik.resetForm()
      })
    }
  

  const handleInventory = (item, purchaseQuantity)=> {
    const newQuantity = item.quantity - purchaseQuantity
    fetch(`/api/items/${item.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type" : "application/json",
         "Accept" : "application/json"
      },
      body: JSON.stringify({quantity: newQuantity}),
     })
     .then(resp => resp.json())
     .then((data) => onUpdateItem(data))
  }

  const displayErrors =(error) => {
    return error ? <p style={{color: "red"}}>{error}</p> : null
  }

  return (
    <div>
      {item.quantity === 0 ? <p>Sorry, out of stock </p> : 
        <>
          <form style={{all: "revert"}} onSubmit={formik.handleSubmit}>
            <label htmlFor="input_quantity">How many would you like to buy?  </label>
            <input style={{width: "75%"}} type="number" id="input_quantity" 
              value={formik.values.input_quantity} 
              onChange={formik.handleChange}/>
            <StyledButton type="submit"
                    startIcon={<ThumbUpAltIcon/>} >
              Confirm Purchase
            </StyledButton>
            {displayErrors(formik.errors.input_quantity)}
          </form>
        </>
      }
    </div>
  )
}

export default ItemPurchase
