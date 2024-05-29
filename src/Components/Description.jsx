import { Fragment, useEffect, useState } from 'react'
import axios from 'axios'
export default function Description({id,fOpen}) {
  const [open, setOpen] = useState(false)
  const [product, setProduct] = useState('')
  const [categories,setCategory] = useState('')
  const getproductById = async()=>{
    try{
    const res = await axios.get("http://localhost:8080/api/product/"+id)
    console.log(res.data)
    setProduct(res.data);
    setCategory(res.Categories);
    } catch(err){
        console.log(err)
    }
  }
  useEffect(()=>{
    getproductById()
    setOpen(fOpen)
},[])

  return (
    
  )
}
