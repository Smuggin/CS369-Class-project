import React, { useEffect, useState } from 'react';
import './styles.css';
import axios from 'axios';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

const ProductCard = () => {
  const [products, setProducts] = useState(null);
  const [product,setProduct] = useState(null)
  const [category,setCategory] =useState(null)
  const [open,setOpen]=useState(false)
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/product');
        console.log(res.data);
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProduct();
  }, []);
  const fetchDescription = async(id)=>{
    try{
      const res = await axios.get("http://localhost:8080/api/product/"+id)
      console.log("success",res.data)
      setProduct(res.data.data)
      setCategory(res.data.Categories)
      console.log(product)
      console.log(category)
      console.log(product[0].ProductName)
      console.log(category[0].CategoryName)
    } catch(err){
        console.log(err)
    }
  }
  const handleOnclick = async(id)=>{
    await fetchDescription(id)
    setOpen(true)
    console.log(open)
  }
  const imsrc = 'https://i.imgur.com/2DhmtJ4.jpg';

  return (
    <div>
      <header></header>
      <main>
        <ul className="cards">
          {products &&
            products.data.map((product) => (
              <li key={product.ProductID}>
                <a href="#" className="card">
                  <img src={product.Pictures} className="card__image" alt={product.ProductName} />
                  <div className="card__overlay">
                    <div className="card__header">
                      <svg className="card__arc" xmlns="http://www.w3.org/2000/svg">
                        <path />
                      </svg>
                      <div className="card__header-text">
                        <h3 className="card__title">{product.ProductName}</h3>
                        <span className="card__price">{product.Price} ฿</span>
                      </div>
                    </div>
                    <p className="card__description" data-id={product.ProductID}>
                      <button className="button-17" role="button" onClick={async ()=>handleOnclick(product.ProductID)}>
                        More details
                      </button>
                    </p>
                  </div>
                </a>
              </li>
            ))}
        </ul>
        {product && category ? 
        <Transition show={open}>
        {console.log(open)}
      <div className="relative z-10" onClose={setOpen}>
        <TransitionChild
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 scale-150">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-2 pb-3 pt-4 h-72 w-full sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                  <img src= {product[0].Pictures} className="h-72 w-64 my-auto" alt={product[0].ProductName} />
                    <div className="mt-3 text-center w-full sm:ml-4 sm:mt-0 sm:text-left">
                      <div as="h3" className="text-3xl font-semibold leading-6 text-gray-900">
                      {product.length > 0 && product[0].ProductName}
                      </div>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                        {category.length > 0 && category[0].CategoryName}
                        </p>
                      </div>
                      <div className="mt-3">
                        <p className="text-lg font-semibold text-red-600">
                          {product[0].Price} ฿
                        </p>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm text-gray-700">
                        {category.length > 0 && category[0].Description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setOpen(false)}
                    data-autofocus
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </TransitionChild>
          </div>
        </div>
      </div>
    </Transition>
: console.log("error")}
      </main>
    </div>
  );
};

export default ProductCard;
