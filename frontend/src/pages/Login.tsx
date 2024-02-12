// @ts-nocheck
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
} from "@material-tailwind/react";
import { useState } from "react";


export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit= (e) =>{
      e.preventDefault();
    
      //backend code
      if(email === "" && password===""){
        setError("");
        console.log("User logined");
      }
      else{
        setError("Invalid email or password");
      }
      
    }

    const isFormValid = () =>{
      console.log(password.value.length);
      return password.value.length >=8;
    }

    return (
        <div className="container">
            <Card color="transparent" shadow={false}>
                <Typography variant="h4" color="blue-gray">
                    Sign In
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                    Nice to meet you! Enter your details to Sign in.
                </Typography>
                <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit = {handleSubmit}>
                    <div className="mb-1 flex flex-col gap-6">
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                        Your Email
                        </Typography>
                        <Input
                        name = "email"
                        value = {email}
                        size="lg"
                        placeholder="name@mail.com"
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }}
                        onChange = {(e) => {setEmail(e.target.value)}}
                        />
                    <Typography variant="h6" color="blue-gray" className="-mb-3">
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
                    </div>
                    {error && (
                        <p className="mt-4 text-red-500 text-sm">{error}</p>
                    )}
                    <Button type="submit" className="mt-6" fullWidth disabled = {!isFormValid}>
                    Sign In
                    </Button>
                    <Typography color="gray" className="mt-4 text-center font-normal">
                    Dont have an account?{" "}
                    <a href="#" className="font-medium text-gray-900">
                        Sign Up
                    </a>
                    </Typography>
                </form>
            </Card>
        </div>
  );
}
