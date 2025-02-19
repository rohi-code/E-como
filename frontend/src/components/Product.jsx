import React from 'react';

function Product({ name, image, description, price }) {
  return (
    <div className="border rounded-lg shadow-lg p-4 bg-white">
      <img className="w-full h-48 object-cover rounded-lg" src={image} alt={name} />
      <div className="mt-4">
        <h2 className="text-lg font-semibold">{name}</h2>
        <p className="text-gray-600">{description}</p>
        <p className="text-blue-500 font-bold mt-2">${price}</p>
      </div>
    </div>
  );
}

export default Product;
