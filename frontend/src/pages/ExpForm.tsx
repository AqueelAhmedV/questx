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
    Textarea,
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
        preferredTime: "",
        rewardOrSalary: 0,
    })
    const [error, setError] = useState({
        name : "",
        location : "",
        phone : "",
        type : "",
        title: "",
        desc: "",
        preferredTime: "",
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
    <div className="container mx-auto overflow-auto h-fit">
            <Card color="transparent" shadow={true} className="my-2 mx-auto w-full max-w-[27rem]">
                <CardHeader
                    floated={false}
                    shadow={false}
                    className="m-0 grid place-items-center  text-center"
                >
                    <Typography variant="h4" color="blue-gray" className="w-max">
                        Sign Up
                    </Typography>
                    <Typography color="gray" className="mt-1 font-normal">
                        Nice to meet you! Enter your details to Sign up.
                    </Typography>
                </CardHeader>
                <CardBody>
                    <Tabs value = {formData.type} className= "overflow-visible">
                        <TabsHeader className="relative z-0 ">
                            <Tab value="task" onClick={() => setFormData((prevState) => ({ ...prevState, type: "task" }))}>
                                Add a Task
                            </Tab>
                            <Tab value="activity" onClick={() => setFormData((prevState) => ({ ...prevState, type: "activity" }))}>
                                Add an Activity
                            </Tab>
                        </TabsHeader>
                        <TabsBody
                            className="!overflow-x-hidden !overflow-y-visible"
                            animate={{
                              initial: {
                                x: formData.type === "task" ? 400 : -400,
                              },
                              mount: {
                                x: 0,
                              },
                              unmount: {
                                x: formData.type === "activity" ? 400 : -400,
                              },
                            }}
                        >
                            <TabPanel value ="task" className="p-0">
                                <form className="mt-12 flex flex-col gap-4 " onSubmit = {handleSubmit}>
                                    <div className="mb-1 flex flex-col gap-4">
                                        <div>
                                            <Typography variant="h6" color="blue-gray" className="mb-1">
                                                Name
                                            </Typography>
                                            <Input
                                                name = "name"
                                                value = {formData.name}
                                                size="lg"
                                                placeholder="John Doe"
                                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                                labelProps={{
                                                    className: "before:content-none after:content-none",
                                                }}
                                                onChange = {handleChange}
                                            />
                                            {error.name && (
                                                <ErrorMessage error= {error.name}/>
                                            )}
                                        </div>
                                        <div>
                                            <Typography variant="h6" color="blue-gray" className="mb-1">
                                                Location
                                            </Typography>
                                            <Input
                                                name = "location"
                                                value = {formData.location}
                                                size="lg"
                                                placeholder=""
                                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                                labelProps={{
                                                    className: "before:content-none after:content-none",
                                                }}
                                                onChange = {handleChange}
                                            />
                                            {error.location && (
                                                <ErrorMessage error= {error.location}/>
                                            )}
                                        </div>
                                        <div>
                                            <Typography variant="h6" color="blue-gray" className="mb-1">
                                                Phone Number
                                            </Typography>
                                            <Input
                                                name = "phone"
                                                value = {formData.phone}
                                                size="lg"
                                                placeholder=""
                                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                                labelProps={{
                                                    className: "before:content-none after:content-none",
                                                }}
                                                onChange = {handleChange}
                                            />
                                            {error.phone && (
                                                <ErrorMessage error= {error.phone}/>
                                            )}
                                        </div>
                                        <div>
                                            <Typography variant="h6" color="blue-gray" className="mb-1">
                                                Task
                                            </Typography>
                                            <Input
                                                name = "title"
                                                value = {formData.title}
                                                size="lg"
                                                placeholder=""
                                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                                labelProps={{
                                                    className: "before:content-none after:content-none",
                                                }}
                                                onChange = {handleChange}
                                            />
                                            {error.title && (
                                                <ErrorMessage error= {error.title}/>
                                            )}
                                        </div>
                                        <div>
                                            <Textarea 
                                                label = "Task Description"
                                                name = "desc"
                                                value = {formData.desc}
                                                size="lg"
                                                onChange = {handleChange}
                                            />
                                            {error.desc && (
                                                <ErrorMessage error= {error.desc}/>
                                            )}
                                        </div>
                                        <div>
                                            <Typography variant="h6" color="blue-gray" className="mb-1">
                                                Duration
                                            </Typography>
                                            <Input
                                                name = "duration"
                                                value = {formData.duration}
                                                type="number"
                                                size="lg"
                                                placeholder=""
                                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                                labelProps={{
                                                    className: "before:content-none after:content-none",
                                                }}
                                                onChange = {handleChange}
                                            />
                                            {error.duration && (
                                                <ErrorMessage error= {error.duration}/>
                                            )}
                                        </div>
                                        <div>
                                            <Select
                                                label = "Preferred Time to work"
                                                 name= "preferredTime"
                                                 value= {formData.preferredTime}
                                                 onChange = {(val)=> (setFormData((prevState) => ({ ...prevState, preferredTime: val })))}
                                            >
                                                <Option value="">Select an option</Option>
                                                <Option value="day">Day Time</Option>
                                                <Option value="night">Night Time</Option>
                                            </Select>
                                            {error.preferredTime && (
                                                <ErrorMessage error= {error.preferredTime}/>
                                            )}
                                        </div>
                                        <div>
                                            <Typography variant="h6" color="blue-gray" className="mb-1">
                                                Reward
                                            </Typography>
                                            <Input
                                                name = "rewardOrSalary"
                                                value = {formData.rewardOrSalary}
                                                type="number"
                                                size="lg"
                                                placeholder=""
                                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                                labelProps={{
                                                    className: "before:content-none after:content-none",
                                                }}
                                                onChange = {handleChange}
                                            />
                                            {error.rewardOrSalary && (
                                                <ErrorMessage error= {error.rewardOrSalary}/>
                                            )}
                                        </div>
                                    </div>
                                    <Button type="submit" className="mt-6" fullWidth>
                                        Submit
                                    </Button>
                                </form>
                            </TabPanel>
                            <TabPanel value ="activity" className="p-0">
                            <form className="mt-12 flex flex-col gap-4" onSubmit = {handleSubmit}>
                                    <div className="mb-1 flex flex-col gap-4">
                                        <div>
                                            <Typography variant="h6" color="blue-gray" className="mb-1">
                                                Name
                                            </Typography>
                                            <Input
                                                name = "name"
                                                value = {formData.name}
                                                size="lg"
                                                placeholder="John Doe"
                                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                                labelProps={{
                                                    className: "before:content-none after:content-none",
                                                }}
                                                onChange = {handleChange}
                                            />
                                            {error.name && (
                                                <ErrorMessage error= {error.name}/>
                                            )}
                                        </div>
                                        <div>
                                            <Typography variant="h6" color="blue-gray" className="mb-1">
                                                Location
                                            </Typography>
                                            <Input
                                                name = "location"
                                                value = {formData.location}
                                                size="lg"
                                                placeholder=""
                                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                                labelProps={{
                                                    className: "before:content-none after:content-none",
                                                }}
                                                onChange = {handleChange}
                                            />
                                            {error.location && (
                                                <ErrorMessage error= {error.location}/>
                                            )}
                                        </div>
                                        <div>
                                            <Typography variant="h6" color="blue-gray" className="mb-1">
                                                Phone Number
                                            </Typography>
                                            <Input
                                                name = "phone"
                                                value = {formData.phone}
                                                size="lg"
                                                placeholder=""
                                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                                labelProps={{
                                                    className: "before:content-none after:content-none",
                                                }}
                                                onChange = {handleChange}
                                            />
                                            {error.phone && (
                                                <ErrorMessage error= {error.phone}/>
                                            )}
                                        </div>
                                        <div>
                                            <Typography variant="h6" color="blue-gray" className="mb-1">
                                                Activity
                                            </Typography>
                                            <Input
                                                name = "title"
                                                value = {formData.title}
                                                size="lg"
                                                placeholder=""
                                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                                labelProps={{
                                                    className: "before:content-none after:content-none",
                                                }}
                                                onChange = {handleChange}
                                            />
                                            {error.title && (
                                                <ErrorMessage error= {error.title}/>
                                            )}
                                        </div>
                                        <div>
                                            <Textarea 
                                                label = "Activity Description"
                                                varient= 'outlined'
                                                name = "desc"
                                                value = {formData.desc}
                                                size="lg"
                                                onChange = {handleChange}
                                            />
                                            {error.desc && (
                                                <ErrorMessage error= {error.desc}/>
                                            )}
                                        </div>
                                        <div>
                                            <Typography variant="h6" color="blue-gray" className="mb-1">
                                                Duration
                                            </Typography>
                                            <Input
                                                name = "duration"
                                                value = {formData.duration}
                                                type="number"
                                                size="lg"
                                                placeholder=""
                                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                                labelProps={{
                                                    className: "before:content-none after:content-none",
                                                }}
                                                onChange = {handleChange}
                                            />
                                            {error.duration && (
                                                <ErrorMessage error= {error.duration}/>
                                            )}
                                        </div>
                                        <div>
                                            <Select
                                                label = "Preferred Time to work"
                                                 name= "preferredTime"
                                                 value= {formData.preferredTime}
                                                 onChange = {(val)=> (setFormData((prevState) => ({ ...prevState, preferredTime: val })))}
                                            >
                                                <Option value="">Select an option</Option>
                                                <Option value="day">Day Time</Option>
                                                <Option value="night">Night Time</Option>
                                            </Select>
                                            {error.preferredTime && (
                                                <ErrorMessage error= {error.preferredTime}/>
                                            )}
                                        </div>
                                        <div>
                                            <Typography variant="h6" color="blue-gray" className="mb-1">
                                                Fare
                                            </Typography>
                                            <Input
                                                name = "rewardOrSalary"
                                                value = {formData.rewardOrSalary}
                                                type="number"
                                                size="lg"
                                                placeholder=""
                                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                                labelProps={{
                                                    className: "before:content-none after:content-none",
                                                }}
                                                onChange = {handleChange}
                                            />
                                            {error.rewardOrSalary && (
                                                <ErrorMessage error= {error.rewardOrSalary}/>
                                            )}
                                        </div>
                                    </div>
                                    <Button type="submit" className="mt-6" fullWidth>
                                        Submit
                                    </Button>
                                </form>
                            </TabPanel>
                        </TabsBody>
                    </Tabs>
                </CardBody>
                
            </Card>
        </div>
  );
}