  import Header from '../Components/Header.jsx'
  import Footer from '../Components/Footer.jsx'
  import Login from '../Components/Login.jsx'
  import Home from '../Components/Home.jsx'
  import { BrowserRouter as Router, Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
  import { useEffect,useState } from 'react';
  import { ClipLoader } from 'react-spinners';
  import axios from 'axios';
import ProductForm from '../Components/ProductForm.jsx';
  function App() {
    const [user,setUser]= useState(null);
    const [loading,setloading] =useState(false)
    const getUser = async() =>{
      try{
      const url = "http://localhost:5000/auth/login/success";
      setloading(true)
        setUser(sessionStorage.getItem('user'))
        console.log(sessionStorage.getItem('user'))
      const {data} = await new axios.get(url,{withCredentials:true});
      setUser(data.user);
      console.log(data)
      setTimeout(()=>{
        setloading(false)
      }, 1000);
      
    }catch (err) {
      console.log(err);
    }
    };

    useEffect(()=>{
      //-----Using-Google + Fetch Method Login---------//
      // const getUser = async ()=>{
      //    await fetch("http://localhost:5000/auth/login/success",{
      //     method:"GET",
      //     credentials:"include",
      //     headers:{
      //       Accept: "application/json",
      //       "Content-Type": "application/json",
      //       "Access-Control-Allow-Credentials":true
      //     },
      //     mode:"cors"
      //   })
      //   .then((response)=>{
      //     if(response.status ===200) return response.json();
      //     throw new Error("authentication has been failed!")
      //   }
      // )
      //   .then((resObject)=>{
      //     setUser(resObject.user);
      //   })
      //   .catch(err=>{
      //     console.log(err);
      //   })
      // };
      getUser();
      setTimeout(()=>{
        setloading(false)
      }, 1000);
    }, []);

      console.log(user);

    return(
        <>
        {
                loading ? 
                <ClipLoader color='red' loading={loading} size={100}/>
                :
        <BrowserRouter>
        <div>
          <Routes>
              <Route path="/" element={
              <>
              <Header user={user}/>
              <Home/>
              </>
            }/>
              <Route path="/login" element={user ? <Navigate to="/"/> : <Login/>}/>
              <Route path="/:id" element={user ? <Header/> : <Navigate to ="/login"/>}/> 
              <Route path="/addProduct" element={user? <ProductForm user={user}/>:<Navigate to ="/Login"/>}/>
          </Routes>
          </div>
        </BrowserRouter>
              }
      </>
      
      );
  }

  export default App
