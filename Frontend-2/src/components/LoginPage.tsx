import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom"

interface LoginInputs {
    email: String;
    password: String;
}

export const LoginPage = () => {
    const navigate = useNavigate();

    const [loginInputs, setLoginInputs] = useState<LoginInputs>({
        email: "",
        password: ""
    })

    const RedirectToHome = (): void => {
        navigate('/home');
    }

    const RedirectToSignup = (): void => {
        navigate('/signup');
    }

    const handleEmailChanges = (event: React.ChangeEvent<HTMLInputElement>): any => {
        setLoginInputs({ ...loginInputs, email: event.target.value });
    }

    const handlePasswordChanges = (event: React.ChangeEvent<HTMLInputElement>): any => {
        setLoginInputs({ ...loginInputs, password: event.target.value });
    }

    const handleLoginCall = async () => {
        try {
            const respnonse = await axios.post("https://shoppr.onrender.com/api/v1/login", {
                email: loginInputs.email,
                password: loginInputs.password,
            });

            console.log(respnonse.data);
            const token = respnonse.data.token;
            localStorage.setItem("token", token);

            navigate('/home');
        }

        catch (error) {
            console.error(`Login Error ${error}`);
        }
    }

    return (
        <div className="min-h-screen bg-gray-200 flex justify-center items-center mt-20">
            <div className="h-[600px] w-96 bg-white rounded-3xl border-2 border-gray-300">

                <div className="flex items-center pt-5 border-b-2 pb-2 border-gray-200 mx-2 hover:text-red-600 ">
                    <div className="pl-4 hover:text-red-600 " onClick={RedirectToHome}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-7 ">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>

                    </div>
                    <div className="text-xl font-semibold text-gray-600 font-mono pl-24 hover:text-pink-600">Register</div>
                </div>

                <div className="flex items-center text-base mt-3 ml-20 cursor-pointer mb-10">
                    <div>Not Signed Up Already</div>
                    <div className="pl-2 text-blue-600" onClick={RedirectToSignup}>SignUp?</div>
                </div>


                <div className="mt-20">
                    <input type="e-mail"
                        placeholder="E-mail"
                        className="border-b-2 ml-10 text-base border-gray-200 w-72  focus:outline-none  hover:border-pink-200"
                        onChange={handleEmailChanges} />
                </div>
                <div className="mt-8">
                    <input type="password"
                        placeholder="Password"
                        className="border-b-2 ml-10 text-base border-gray-200 w-72  focus:outline-none  hover:border-pink-200"
                        onChange={handlePasswordChanges} />
                </div>

                <div>
                    <button className="bg-pink-500 text-white ml-20 px-20 py-2 rounded-md mt-10 hover:text-black" onClick={handleLoginCall}>Login</button>
                </div>

            </div>
        </div>
    )
}
