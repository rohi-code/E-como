import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import server from '../server'
import axios from 'axios'

function Activation() {
const {Activation_Token}=useParams()
const [error,setError]=useState(false)

useEffect(()=>{
const activation = async()=>{
  try{
  await axios.post(`${server}/activate`,{activationToken:Activation_Token})
  .then(res=>{
    console.log(res.data.message)
  })

  }
  catch(e){
    console.log(e)
  setError(true)
  }

}
activation()

},[Activation_Token])

  return (
    <div>
      {error ?(<div>Activation unsuccessful</div>):(<div>Activation successful</div>)}
    </div>
  )
}

export default Activation
