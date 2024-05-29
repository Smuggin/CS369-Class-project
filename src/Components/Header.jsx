import Navbar from './Navbar.jsx'
function Header({user}){

    return(
    <>
    <div className='header'>
        <Navbar user={user}/>
    </div>
    </>
);
}
export default Header