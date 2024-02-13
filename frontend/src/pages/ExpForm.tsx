// @ts-nocheck
import {
    Card,
    CardHeader,
    CardBody,
    Input,
    Button,
    Typography,
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
    Select,
    Option,
} from "@material-tailwind/react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";

 

 
export function ExpForm() {

    const [formData, setFormData] = useState({
        name : "",
        location : "",
        phone : "",
        type : "task",
        title: "",
        desc: "",
        duration: 0,
        preferredTime: "day",
        rewardOrSalary: 0,
    })
    const [error, setError] = useState({
        name : "",
        location : "",
        phone : "",
        type : "task",
        title: "",
        desc: "",
        duration: 0,
        preferredTime: "day",
        rewardOrSalary: 0,
    });
    const location = useLocation();
    const { userType } = location.state || {};

    const handleSubmit= (e) =>{
      e.preventDefault();
      //backend
      
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
      };

    const isFormValid = () => {
        return (formData.name && 
            formData.location && 
            formData.title && 
            formData.type && 
            formData.preferredTime && 
            formData.duration &&
            formData.rewardOrSalary);
    }
  
  return (
    <div className="container">
            <Card color="transparent" shadow={true} className="mt-2 p-5 w-max mx-auto">
                <CardBody>
                    <Tabs>
                        
                    </Tabs>
                </CardBody>
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
                                Name
                            </Typography>
                            <Input
                                name = "name"
                                value = {formData.name}
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