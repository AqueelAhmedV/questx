// @ts-nocheck
import {
    Card,
    CardHeader,
    CardBody,
    Input,
    Checkbox,
    Button,
    Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";


export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const location = useLocation();
    const { userType } = location.state || {};

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
        <div className="container mx-auto">
            <Card className="my-2 mx-auto w-max max-w-full" color="transparent" shadow>
                <CardHeader
                        floated={false}
                        shadow={false}
                        className="m-0 grid place-items-center  text-center"
                    >
                    <Typography variant="h4" color="blue-gray" className="w-max">
                        Sign In
                    </Typography>
                    <Typography color="gray" className="mt-1 font-normal w-max">
                        Nice to meet you! Enter your details to Sign in.
                    </Typography>
                </CardHeader>
                <CardBody >
                    <form className="mt-3 mb-2 w-80 max-w-screen-lg sm:w-calc(100vw-2rem)" onSubmit = {handleSubmit}>
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
                            <ErrorMessage error = {error}/>
                        )}
                        <Button type="submit" className="mt-6" fullWidth disabled = {!isFormValid}>
                        Sign In
                        </Button>
                        <Typography color="gray" className="mt-4 text-center font-normal">
                        Dont have an account?{" "}
                        <Link to = '/register'
                            state ={{userType}} 
                            className="font-medium text-gray-900"
                        >
                            Sign Up
                        </Link>
                        </Typography>
                    </form>
                </CardBody>
                
            </Card>
        </div>
  );
}
