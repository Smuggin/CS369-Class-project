import { 
    EnvelopeIcon,
    LockClosedIcon,
    UserIcon
} from "@heroicons/react/24/outline"
function Login(){
    return(
        <div className="grid divide-y justify-center content-center max-w-full h-[100vh] font-sans">
            <div className="font-bold text-5xl pb-4 font-medium border-none">
                <div className="singUp">Sign Up</div>
                <div className="desc text-lg pt-4 font-medium text-gray-500">Please enter your details</div>
            </div>
            <div className="inputs space-y-8 font-medium border-none">
                <div className="input">
                    <label>Name</label>
                    <input type="text" placeholder="Enter your name"/>
                </div>
                <div className="input">
                    <label>Email</label>
                    <input type="email" placeholder="Enter your email"/>
                </div>
                <div className="input">
                    <label>Password</label>
                    <input type="password" placeholder="Enter your password"/>
                </div>
                <div className="input">
                    <input type="checkbox" id="remember"/>
                    <label for="remember">Remember me?</label>
                </div>
            </div>
            <div className="submit-container font-medium border-none">
                <div className="submit">Sign Up</div>
                <div className="submit">Login</div>
            </div>
        </div>
    )
}
export default Login