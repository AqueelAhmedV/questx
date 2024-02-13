// @ts-nocheck
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";


export const Register = () => {
    const [formData, setFormData] = useState({
        firstName : "",
        lastName : "",
        email : "",
        password: "",
        password2: "",
    })
    const [error, setError] = useState({
        firstName : "",
        email : "",
        password : "",
        password2 : ""
    });
    const location = useLocation();
    const { userType } = location.state || {};

    const handleSubmit= (e) =>{
      e.preventDefault();
      if(formData.password2 !== formData.password){
        setError((prevState) => ({...prevState, password2 : "passwords should match"}));
      }
      else{
        setError((prevState) => ({...prevState, password2 : ""}))
        //backend code
      }
      
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
      };

    const isFormValid = () => {
        return formData.firstName && formData.email && formData.password && formData.password2
    }

    return (
        <div className="container">
            <Card color="transparent" shadow={false} className="pt-5 w-max mx-auto">
                <Typography variant="h4" color="blue-gray" className="w-max">
                    Sign Up
                </Typography>
                <Typography color="gray" className="mt-1 font-normal w-max">
                    Nice to meet you! Enter your details to Sign up.
                </Typography>
                <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit = {handleSubmit}>
                    <div className="mb-1 flex flex-col gap-4">
                        <div>
                            <Typography variant="h6" color="blue-gray" className="mb-1">
                                First Name
                            </Typography>
                            <Input
                                name = "firstName"
                                value = {formData.firstName}
                                size="lg"
                                placeholder="John"
                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                                onChange = {handleChange}
                            />
                            {error.firstName && (
                                <ErrorMessage error= {error.firstName}/>
                            )}
                        </div>
                        <div>
                            <Typography variant="h6" color="blue-gray" className="mb-1">
                                Last Name
                            </Typography>
                            <Input
                                name = "lastName"
                                value = {formData.lastName}
                                size="lg"
                                placeholder="Doe"
                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                                onChange = {handleChange}
                            />
                        </div>
                        <div>
                            <Typography variant="h6" color="blue-gray" className="mb-1">
                                Your Email
                            </Typography>
                            <Input
                                name = "email"
                                value = {formData.email}
                                size="lg"
                                placeholder="name@mail.com"
                                className=" !border-blue-gray-200 focus:!border-gray-900"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                                onChange = {handleChange}
                            />
                            {error.email && (
                                <ErrorMessage error= {error.email}/>
                            )}
                        </div>
                        <div>
                            <Typography variant="h6" color="blue-gray" className="mb-1">
                                Password
                            </Typography>
                            <Input
                                name = "password"
                                value = {formData.password}
                                type="password"
                                size="lg"
                                placeholder="********"
                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                labelProps={{
                                className: "before:content-none after:content-none",
                                }}
                                onChange = {handleChange}
                            />
                            {error.password && (
                                <ErrorMessage error= {error.password}/>
                            )}
                        </div>
                        
                        <div>
                            <Typography variant="h6" color="blue-gray" className="mb-1">
                                Confirm Password
                            </Typography>
                            <Input
                                name = "password2"
                                value = {formData.password2}
                                type="password"
                                size="lg"
                                placeholder="********"
                                className=" border-t-blue-gray-200 focus:border-t-gray-900"
                                labelProps={{
                                className: "before:content-none after:content-none",
                                }}
                                
                                onChange = {handleChange}
                                error = {error.password2 !=="" ? true : false}
                            />
                            {error.password2 && (
                                <ErrorMessage error= {error.password2}/>
                            )}
                        </div>
                    </div>
                    <Button type="submit" className="mt-6" fullWidth  disabled={!isFormValid()}>
                        Sign Up
                    </Button>
                    <Typography color="gray" className="mt-4 text-center font-normal">
                    Already have an account?{" "}
                    <Link to = '/login'
                        state ={{userType}}
                        className="font-medium text-gray-900"
                    >
                        Sign in
                    </Link>
                    </Typography>
                </form>
            </Card>
        </div>
  );
}
