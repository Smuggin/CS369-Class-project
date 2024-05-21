import { 
    EnvelopeIcon,
    LockClosedIcon,
    UserIcon
} from "@heroicons/react/24/outline"
function Login(){
    return(
        <div className="bg-gray-300">
        <div className="grid divide-y justify-center content-center max-w-full h-[100vh] font-sans">
            <div className="bg-white p-10 p-20 rounded-3xl border-gray-100 border-2">
            <div className="font-bold text-5xl pb-4 font-medium border-none">
                <div className="singUp">Sign Up</div>
                <div className="desc text-lg pt-4 font-medium text-gray-500">Please enter your details</div>
            </div>
            <div className="inputs space-y-4 font-medium border-none">
                <div className="input">
                    <label className="font-medium text-lg">Name</label>
                    <input className="w-full mt-2 border-2 border-gray-100 rounded-xl p-4 bg-transparent font-light" type="text" placeholder="Enter your name"/>
                </div>
                <div className="input">
                    <label className="font-medium text-lg">Email</label>
                    <input className="w-full mt-2 border-2 border-gray-100 rounded-xl p-4 bg-transparent font-light" type="email" placeholder="Enter your email"/>
                </div>
                <div className="input">
                    <label className="font-medium text-lg">Password</label>
                    <input className="w-full mt-2 border-2 border-gray-100 rounded-xl p-4 bg-transparent font-light" type="password" placeholder="Enter your password"/>
                </div>
                
            </div>
            <div className="submit-container font-medium border-none ">
                <div className="submit"><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded mt-4 self-center w-full">Sign Up</button></div>
                <div className="submit">
                        <button class=" w-full self-center justify-center mt-4 px-4 py-4 border flex gap-2 border-dark-200 dark:border-dark-700 rounded-lg text-dark-700 dark:text-dark-200 hover:border-dark-400 dark:hover:border-dark-500 hover:text-dark-900 dark:hover:text-dark-300 hover:shadow transition duration-150">
                            <img class="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo"/>
                            <span>Signup with Google</span>
                        </button>
                </div>
            </div>
            </div>
        </div>
        </div>
    )
}
export default Login