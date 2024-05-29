import React, { useEffect,useState } from 'react';
import Navbar from './Navbar'
import axios from 'axios';
import {Dropdown} from 'semantic-ui-react'
const ProductForm = (user) => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productImage, setProductImage] = useState();
  const [suppliers, setSuppliers] =useState('');
  const [units,setUnits]=useState('');
  const [productUnit, setProductUnit] = useState('');
  const [productSupplier, setProductSupplier] = useState();
  const [productCategory, setProductCategory] = useState()
  const [categories,setCategory] = useState();
  useEffect(()=>{
    getSuppliers()
  },[]);
  const getSuppliers =async ()=>{
    const res = await axios.get('http://localhost:8080/api/addProduct/choice')
    console.log(res)
    setSuppliers(res.data.suppliers);
    setUnits(res.data.units);
    setCategory(res.data.Categories)
  }
  const handleImageChange = (e) => {
    console.log("click")
    setProductImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append('ProductName',productName);
    formdata.append('Price',productPrice);
    formdata.append('SupplierID',productSupplier);
    formdata.append('Description',productDescription);
    formdata.append('Unit',productName);
    formdata.append('CategoryID',productCategory);
    formdata.append('image', productImage);
    console.log({
      productName,
      productPrice,
      productSupplier,
      productUnit,
      productDescription,
      productCategory
    })
    // Send data to your server here, e.g., using fetch or axios
    await axios.post("http://localhost:8080/api/addProduct/upload",formdata)
    .then(res=>console.log("test",res))
    .catch(err=>console.log(err))
  };

  
  return (
    <>
    <Navbar user={user}/>
    <div className="bg-gray-300">
    <div className='grid divide-y justify-center content-center max-w-full h-[100vh] font-sans'>
    <div className="bg-white p-10 pb-6 pt-10 rounded-3xl border-gray-100 border-2">
    <form className="product-form" onSubmit={handleSubmit}>
    <div className="font-bold text-4xl pb-4 font-medium border-none">
      Add products 
    </div>
      <div className="form-group font-medium border-none mb-3 flex flex-col items-start">
        <label className='align-top'>Product Name<span className='font-medium text-gray-500'> (Max-Character 50)</span></label>
        <input className='w-full mt-2 border-2 border-gray-400 rounded-xl p-3 bg-transparent font-light '
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
        />
      </div>
      <div className='grid grid-cols-3 self-center justify-items-center'>
      <div className="form-group font-medium border-none mb-3 flex flex-col items-start ">
        <label class="align-top">Product Price <span className='font-medium text-gray-500'> (฿)</span></label>
        <input
          className='w-40 mt-2 border-2 border-gray-400 rounded-xl p-2 bg-transparent font-light'
          type="number"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
          required
        />  
      </div>
      <div className="form-group font-medium border-none mb-3 flex flex-col items-start">
        <label class="align-top">Product Units <span className='font-medium text-gray-500'></span></label>
        <select className="w-36 mt-2 border-2 border-gray-400 rounded-xl p-2 bg-transparent font-light" name="units" value={productUnit} onChange={(e)=> setProductUnit(e.target.value)}>
          {units &&
          units.map((unit)=>(
            <option key={unit.Unit}value={unit.Unit}>{unit.Unit}</option>
          ))}
        </select>
      </div>
      <div className="form-group font-medium border-none mb-3 flex flex-col items-start">
        <label class="align-top">Product Supplier</label>
        <select className="w-40 mt-2 border-2 border-gray-400 rounded-xl p-2 bg-transparent font-light" name="units" value={productSupplier} onChange={(e)=> setProductSupplier(e.target.value)}>
          {suppliers &&
          suppliers.map((supplier)=>(
            <option key={supplier.SupplierID} value={supplier.SupplierID}>{supplier.SupplierName}</option>
          ))}
        </select>
      </div>
      </div>
      <div className="form-group font-medium border-none mb-3 flex flex-col items-start">
        <label>Description</label>
        <textarea
        className='w-full h-48 mt-2 border-2 border-gray-400 rounded-xl p-2 bg-transparent font-light'
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
        />
      </div>
      <div className="form-group font-medium border-none mb-3 flex flex-col items-start">
        <label>Category</label>
        <select className="w-full mt-2 border-2 border-gray-400 rounded-xl p-2 bg-transparent font-light" name="units" value={productCategory} onChange={(e)=> setProductCategory(e.target.value)}>
          {categories &&
          categories.map((category)=>(
            <option key={category.CategoryID} value={category.CategoryID}>{category.CategoryName}</option>
          ))}
        </select>
      </div>
      <div className="form-group grid grid-cols-2 mb-1 flex flex-col items-start gap-4">
      <div className="w-full">
      <label class="block mb-2 text-sm font-medium text-gray-900" for="file_input">Upload file</label>
      <input
    type="file"
    class="block w-full text-sm text-slate-500
        file:mr-4 file:py-2 file:px-4 file:rounded-md
        file:border-0 file:text-sm file:font-semibold
        file:bg-pink-50 file:text-pink-700
        hover:file:bg-pink-100"
        onChange={handleImageChange}
        required
  />
  </div>
        <button className="submit-button h-full bg-green-400 rounded-lg" type="submit">Submit</button>
      </div>
    </form>
    </div>
    </div>
    </div>
    </>
  );
};

export default ProductForm;