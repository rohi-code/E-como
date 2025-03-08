import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import server from "../server";
import Nav from "../components/nav";
import { IoAddOutline } from "react-icons/io5";
import { RiSubtractFill } from "react-icons/ri";

const ProductDetail = () => {
  const [product, setProduct] = useState({});
  const [error, setError] = useState("");
  const { id } = useParams();
  const [img, setImg] = useState("");
  const [state, setState] = useState(0);
 const email=`sankamithra1614@gmail.com`
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`${server}/product/product/${id}`);
        setProduct(data);
        setImg(data.images[0]);
      } catch (e) {
        setError(e.message);
      }
    };

    fetchProduct();
  }, [id]);


  const addToCart=async() => {
try{
  if (state <= 0) {
    console.log("Select at least 1 quantity before adding to cart.");
    return;
  }
  const res = await axios.post(`${server}/product/addTocart`,{
    userId:email,
    productId:id,
    quantity:state
  })
  console.log(res)
}catch(e){
console.log(e)
}
  }

  if (error) {
    return <div className="text-center text-red-500 mt-10">Error: {error}</div>;
  }


  return (
    <div className="min-h-screen bg-gray-100">
      <Nav />
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Product Image */}
          <img
            src={`http://localhost:5000/products/${img}`}
            alt={product.name}
            className="w-64 h-64 object-cover rounded-md shadow-md"
          />
          {/* Product Details */}
          <div>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-xl font-semibold text-gray-900">Price: ${product.price}</p>

            {/* Add to Cart Section */}
            <div className="mt-6 flex flex-col gap-4">
              <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
                Add to Wishlist
              </button>

              <div className="flex items-center gap-3">
                <IoAddOutline
                  className="text-2xl cursor-pointer text-gray-700 hover:text-gray-900"
                  onClick={() => setState((prev) => prev + 1)}
                />
                <span className="text-lg font-medium">{state}</span>
                <RiSubtractFill
                  className={`text-2xl cursor-pointer ${
                    state > 0 ? "text-gray-700 hover:text-gray-900" : "text-gray-400"
                  }`}
                  onClick={() => setState((prev) => (prev > 0 ? prev - 1 : 0))}
                />
              </div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"onClick={addToCart}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
