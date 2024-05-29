import { Fragment, useState } from 'react'
import {Link} from 'react-router-dom'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example({user}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const logout =() =>{
    if(sessionStorage.getItem('user')!=null){
      sessionStorage.clear();
      window.open("http://localhost:5000/auth/logout","_self");

    }else{
    window.open("http://localhost:5000/auth/logout","_self");
    setloading(false);
  }
  }
  return (
    <header className="bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only fixed">Ecom</span>
            <span className='text-black -mx-3 block rounded-lg px-3 py-2.5 font-semibold leading-7 text-gray-900 text-2xl'>E<span className='text-red-700'>com</span></span>
          </a>
        </div>
      <div className='component flex'>
        {window.location.pathname === '/addProduct' ? 
        <Link to="/" className="w-5 h-5 items;" id="cart">
       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
        </svg>
        </Link>
        :
        <Link to="/addProduct" className="w-5 h-5 items;" id="cart">
       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
        </svg>
        </Link>
        }
        {user ? (
          <>
          <div class="flex items-center border-l border-slate-200 ml-6 pl-6 dark:border-slate-800" ><label class="sr-only" for="headlessui-listbox-button-:rc:" id="headlessui-label-:rb:" data-headlessui-state="">Theme</label></div>
          <Link to="/login" className="w-5 h-5" id="login">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>
            <span className="text-sm font-semibold leading-6 text-gray-900" onClick={logout}>logout</span>
          </Link>
          </>
        ) : (
          <>
          <div class="flex items-center border-l border-slate-200 ml-6 pl-6 dark:border-slate-800"><label class="sr-only" for="headlessui-listbox-button-:rc:" id="headlessui-label-:rb:" data-headlessui-state="">Theme</label></div>
          <Link to="/login" className="text-sm font-semibold leading-6 text-gray-900">
            Login <span aria-hidden="true">&rarr;</span>
          </Link>
          </>
        )}
        </div>
      </nav>
    </header>
  )
}
