import Navbar from './Navbar.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function Header(){

    return(
    <div className='header'>
        <Navbar/>
    </div>);
}
export default Header