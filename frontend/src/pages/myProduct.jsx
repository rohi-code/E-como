import React, { useEffect, useState } from 'react'
import axios from 'axios'
import server from '../server'
import Product from '../components/product'
import {useNavigate} from 'react-router-dom'


const MyProduct = () => {
const[product,setProduct]=  useState([])
const [error,setError]=useState('')
const navigate=useNavigate()
const email = `sankamithra1614@gmail.com`
useEffect(()=>{
    const prd = async()=>{
        try{
        const { data } = await axios.get(`${server}/product/my-products?email=${email}`);
         console.log(data)
         setProduct(data.products)
        }
        catch(e){
            console.log(e.message)
            setError(e.message)
        }
        
    }
    prd()
},[])

    if (error) {
        return <div className="text-center text-red-500 mt-10">Error: {error}</div>;
      }

  return (
    <div>
      <h1>my Products</h1>
      <div className='flex gap-2.5'>
      {product.map((item) => (
    <Product key={item._id} {...item} /> // ✅ Use MongoDB _id as the key
))}


      </div>
      <button onClick={()=>navigate('/productCreate')}>create product</button>
    </div>
  )
}

export default MyProduct
