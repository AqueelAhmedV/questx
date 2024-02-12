// @ts-nocheck
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
} from "@material-tailwind/react";
import { useState } from "react";


export const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2]= useState("");
    const [error, setError] = useState({
        name : "",
        email : "",
        password : "",
        password2 : ""
    });

    const handleSubmit= (e) =>{
      e.preventDefault();
      if(password2 !== password){
        setError((prevState) => ({...prevState, password2 : "passwords should match"}));
      }
      else{
        setError((prevState) => ({...prevState, password2 : ""}))
        //backend code
      }
      
    }

    const isFormValid = () => {
        return name && email && password && password2
    }

    return (
        <div className="container">
            <Card color="transparent" shadow={false}>
                <Typography variant="h4" color="blue-gray">
                    Sign Up
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                    Nice to meet you! Enter your details to Sign up.
                </Typography>
                <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit = {handleSubmit}>
                    <div className="mb-1 flex flex-col gap-4">
                        <div>
                            <Typography variant="h6" color="blue-gray" className="mb-1">
                                Full Name
                            </Typography>
                            <Input
                                name = "name"
                                value = {name}
                                size="lg"
                                placeholder="John Doe"
                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                                onChange = {(e) => {setName(e.target.value)}}
                            />
                            {error.name && (
                                <Typography
                                variant="small"
                                color="red"
                                className="flex items-center gap-1 font-normal"
                                >
                                    <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="-mt-px h-4 w-4"
                                    >
                                    <path
                                        fillRule="evenodd"
                                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                        clipRule="evenodd"
                                    />
                                    </svg>
                                    {error.name}
                                </Typography>
                            )}
                        </div>
                        <div>
                            <Typography variant="h6" color="blue-gray" className="mb-1">
                                Your Email
                            </Typography>
                            <Input
                                name = "email"
                                value = {email}
                                size="lg"
                                placeholder="name@mail.com"
                                className=" !border-blue-gray-200 focus:!border-gray-900"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                                onChange = {(e) => {setEmail(e.target.value)}}
                            />
                            {error.email && (
                                <Typography
                                variant="small"
                                color="red"
                                className="flex items-center gap-1 font-normal"
                                >
                                    <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="-mt-px h-4 w-4"
                                    >
                                    <path
                                        fillRule="evenodd"
                                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                        clipRule="evenodd"
                                    />
                                    </svg>
                                    {error.email}
                                </Typography>
                            )}
                        </div>
                        <div>
                            <Typography variant="h6" color="blue-gray" className="mb-1">
                                Password
                            </Typography>
                            <Input
                                name = "password"
                                value = {password}
                                type="password"
                                size="lg"
                                placeholder="********"
                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                labelProps={{
                                className: "before:content-none after:content-none",
                                }}
                                onChange = {(e) => {setPassword(e.target.value)}}
                            />
                            {error.password && (
                                <Typography
                                variant="small"
                                color="red"
                                className="flex items-center gap-1 font-normal"
                                >
                                    <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="-mt-px h-4 w-4"
                                    >
                                    <path
                                        fillRule="evenodd"
                                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                        clipRule="evenodd"
                                    />
                                    </svg>
                                    {error.password}
                                </Typography>
                            )}
                        </div>
                        
                        <div>
                            <Typography variant="h6" color="blue-gray" className="mb-1">
                                Confirm Password
                            </Typography>
                            <Input
                                name = "password2"
                                value = {password2}
                                type="password"
                                size="lg"
                                placeholder="********"
                                className=" border-t-blue-gray-200 focus:border-t-gray-900"
                                labelProps={{
                                className: "before:content-none after:content-none",
                                }}
                                
                                onChange = {(e) => {setPassword2(e.target.value)}}
                                error = {error.password2 !=="" ? true : false}
                            />
                            {error.password2 && (
                                <Typography
                                variant="small"
                                color="red"
                                className="flex items-center gap-1 font-normal"
                                >
                                    <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="-mt-px h-4 w-4"
                                    >
                                    <path
                                        fillRule="evenodd"
                                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                        clipRule="evenodd"
                                    />
                                    </svg>
                                    {error.password2}
                                </Typography>
                            )}
                        </div>
                    </div>
                    <Button type="submit" className="mt-6" fullWidth  disabled={!isFormValid()}>
                        Sign Up
                    </Button>
                    <Typography color="gray" className="mt-4 text-center font-normal">
                    Already have an account?{" "}
                    <a href="#" className="font-medium text-gray-900">
                        Sign in
                    </a>
                    </Typography>
                </form>
            </Card>
        </div>
  );
}
