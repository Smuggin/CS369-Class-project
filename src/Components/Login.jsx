import { 
    EnvelopeIcon,
    LockClosedIcon,
    UserIcon
} from "@heroicons/react/24/outline"
import axios from "axios";
import {useState} from 'react';
function Login(){
    const google =()=>{
        window.open("http://localhost:5000/auth/google/callback")
    }
    const [email, setEmail] = useState('')
    const [password,setPassword] = useState('')
    console.log(email)
    console.log(email)
const handleSubmit = (e) =>{
    e.preventdefault();
    try {
        const res = axios.post('http://localhost:5000/auth/password/', {
            email,
            password
        });
        console.log(res.data.message);
    } catch (err) {
        console.log(err);
        // Handle error
    }
};
    return(
        <div className="bg-gray-300">
        <div className="grid divide-y justify-center content-center max-w-full h-[100vh] font-sans">
            <div className="bg-white p-10 py-20 rounded-3xl border-gray-100 border-2">
            <div className="font-bold text-5xl pb-4 font-medium border-none">
                <div className="singUp">Welcome!</div>
                <div className="desc text-lg pt-4 font-medium text-gray-500">Ecom website</div>
            </div>
            <form onSubmit={handleSubmit}>
            <div className="inputs space-y-4 font-medium border-none">
                <div className="input">
                    <label className="font-medium text-lg">Email</label>
                    <input className="w-full mt-2 border-2 border-gray-100 rounded-xl p-4 bg-transparent font-light" type="email" id="username" placeholder="Enter your email" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
                </div>
                <div className="input">
                    <label className="font-medium text-lg">Password</label>
                    <input className="w-full mt-2 border-2 border-gray-100 rounded-xl p-4 bg-transparent font-light" type="password" id="password" placeholder="Enter your password"value={password} onChange={(e)=>setPassword(e.target.value)}  required/>
                </div>
                
            </div>
            <div className="submit-container font-medium border-none ">
                <div className="submit"><button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded mt-4 self-center w-full">Login</button></div>
            </div>
            </form>
            <div className="submit-container font-medium border-none ">    
                <div className="submit">
                        <button onClick={google} class=" w-full self-center justify-center mt-4 px-4 py-4 border flex gap-2 border-dark-200 dark:border-dark-700 rounded-lg text-dark-700 dark:text-dark-200 hover:border-dark-400 dark:hover:border-dark-500 hover:text-dark-900 dark:hover:text-dark-300 hover:shadow transition duration-150">
                            <img class="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo"/>
                            <span>Login with Google</span>
                        </button>
                </div>
            </div>
            <div className="noAcc font-medium border-none text-center mt-4">
                <div className="SignUp">
                    <label>
                        Don't have an account? <span className="text-red-600 hover:underline hover:cursor-pointer underline-offset-4">Sign in</span>
                    </label>
                </div>
            </div>
            </div>
            </div>
        </div>
    )
}
export default Login