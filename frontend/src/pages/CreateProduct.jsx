import React, { useState } from 'react';
import server from '../server';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
function CreateProduct() {
  const [images, setImages] = useState([]);
  const [preImage, setPreImage] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [email, setEmail] = useState("");
  const location=useLocation()


  const categoriesData = [
    { title: "Electronics" },
    { title: "Fashion" },
    { title: "Books" },
    { title: "Home Appliances" },
  ];

  const handleImage = (e) => {
    const files = Array.from(e.target.files);
    setImages((prevImg) => [...prevImg, ...files]);
    const imagePreviews = files.map((file) => URL.createObjectURL(file));
    setPreImage((prev) => [...prev, ...imagePreviews]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('tags', tags);
    formData.append('price', price);
    formData.append('stock', stock);
    formData.append('email', email);
    images.forEach((image) => {
      formData.append("images", image);
    });
    
    try {
      const response = await axios.post(
        `${server}/product/createProduct`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' }, withCredentials: true }
      );
      
      if (response.status === 201) {
        alert("Product created successfully!");
        setImages([]);
        setName("");
        setDescription("");
        setCategory("");
        setTags("");
        setPrice("");
        setStock("");
        setEmail("");
      }
    } catch (err) {
      console.error("Error creating product:", err);
      alert("Failed to create product. Please check the data and try again.");
    }
  };


const handleEdit = async(e)=>{
  const id = location.state.id
console.log(id)
  e.preventDefault();
  const formData = new FormData();
  formData.append('name', name);
  formData.append('description', description);
  formData.append('category', category);
  formData.append('tags', tags);
  formData.append('price', price);
  formData.append('stock', stock);
  formData.append('email', email);
  images.forEach((image) => {
    formData.append("images", image);
  });
  
  try {
    const response = await axios.put(
      `${server}/product/update-product/${id}`,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' }, withCredentials: true }
    );
    
    if (response.status === 200) {
      alert("Product updated successfully!");
      setImages([]);
      setName("");
      setDescription("");
      setCategory("");
      setTags("");
      setPrice("");
      setStock("");
      setEmail("");
    }
  } catch (err) {
    console.error("Error creating product:", err);
    alert("Failed to update product. Please check the data and try again.");
  }

}


  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h5 className="text-xl font-semibold mb-4">Create Product</h5>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Email <span className="text-red-500">*</span></label>
          <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} 
            placeholder='Enter your email' required 
            className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-gray-700">Name <span className="text-red-500">*</span></label>
          <input type='text' value={name} onChange={(e) => setName(e.target.value)} 
            placeholder='Enter product name' required 
            className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-gray-700">Description <span className="text-red-500">*</span></label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} 
            placeholder='Enter product description' rows="4" required 
            className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-gray-700">Category <span className="text-red-500">*</span></label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} required 
            className="w-full p-2 border rounded">
            <option>Select an option</option>
            {categoriesData.map((item, ind) => (
              <option value={item.title} key={ind}>{item.title}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700">Tags</label>
          <input type='text' value={tags} onChange={(e) => setTags(e.target.value)} 
            className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-gray-700">Price <span className="text-red-500">*</span></label>
          <input type='number' value={price} onChange={(e) => setPrice(e.target.value)} required 
            className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-gray-700">Stock <span className="text-red-500">*</span></label>
          <input type='number' value={stock} onChange={(e) => setStock(e.target.value)} required 
            className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-gray-700">Upload Images <span className="text-red-500">*</span></label>
          <input type='file' id='upload' onChange={handleImage} required multiple 
            className="w-full p-2 border rounded" />
          <div className="flex flex-wrap mt-2">
            {preImage.map((img, index) => (
              <img src={img} key={index} alt="Preview" 
                className="w-24 h-24 object-cover m-2 rounded-lg border" />
            ))}
          </div>
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Create
        </button>
        <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600" onClick={handleEdit}>Edit button</button>
      </form>
    </div>
  );
}

export default CreateProduct;
