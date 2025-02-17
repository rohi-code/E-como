import React from 'react'

function Product({name,description, image,price}) {
  return (
    <div  className='mt-5 ml-2 shadow-2xl shadow-gray-400'>
      <div className='flex flex-col'>
        <img src={image} alt={name}/>
        
    <div className='flex justify-between'>

            <h1>
              {name}
            </h1>
            <h1>${price}</h1>
    </div>
        
      </div>
          <div>
            <p>
              {description}
            </p>
          </div>
    </div>
  )
}

export default Product
