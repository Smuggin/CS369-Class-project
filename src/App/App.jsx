import Header from '../Components/Header.jsx'
import Footer from '../Components/Footer.jsx'
import Login from '../Components/Login.jsx'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
function App() {
  
    return(
      <>
      <BrowserRouter>
      <div>
        <Routes>
            <Route path="/" element={<Header/>}/>
            <Route path="/login" element={<Login/>}/>
            {/* <Route path="/cart" element={<Cart/>}/> */}
        </Routes>
        </div>
      </BrowserRouter>
      </>
    );
}

export default App
