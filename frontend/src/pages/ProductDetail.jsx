import React, { useEffect ,useState} from 'react'
import {useParams} from 'react-router-dom';
import axios from 'axios'
import server from '../server';
const ProductDetail = () => {
    const[product,setProduct]=  useState([])
    const [error,setError]=useState('')
    const {id}=useParams()
    const [img,setImg]=useState('')
useEffect(()=>{
const fetchproduct=async()=>{
    try{
const {data}= await axios.get(`${server}/product/product/${id}`)
console.log(data)
setProduct(data) 
setImg(data.images[0])
console.log(img)
}
catch(e){
    console.log(e.message)
    setError(e.message)
}
}
if (error) {
    return <div className="text-center text-red-500 mt-10">Error: {error}</div>;
  }
fetchproduct()
},[])


  return (
    <div>
        <h1 className="text-xl font-bold">{product.name}</h1>
      <img src={`http://localhost:5000/products/${img}`} alt={product.name} className="w-64 h-64 object-cover" />
      <p className="mt-2">{product.description}</p>
      <p className="mt-2 font-semibold">Price: ${product.price}</p>
    </div>
  )
}

export default ProductDetail
