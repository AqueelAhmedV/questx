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
import { createExperience } from "../api/expApi";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";

 

 
export function ExpForm() {

    const [formData, setFormData] = useState({
        name : "",
        location : "",
        phone : "",
        type : "task",
        title: "",
        desc: "",
        date: "",
        startTime: "",
        endTime: "",
        rewardOrSalary: 0,
    })
    const [date, setDate]= useState("");
    const [error, setError] = useState({
        name : "",
        location : "",
        phone : "",
        type : "",
        title: "",
        desc: "",
        date: "",
    });
    
    const { authToken } = useAuth()

    const handleSubmit= (e) =>{
      e.preventDefault();
      //backend
      createExperience({
        agent_name: formData.name,
        agent_phone: formData.phone,
        agent_location: formData.location,
        exp_date: formData.date,
        exp_title: formData.title,
        exp_type: formData.type,
        exp_description: formData.desc,
        exp_start_time: parseInt(formData.startTime),
        exp_end_time: parseInt(formData.endTime)
        
      }, authToken)
      .then((res) => {
        toast(`${formData.type} created successfully`, { type: "success" })
        console.log(res)
        setTimeout(() => {
            window.location = '/'
        }, 3000)
      })
      .catch((err) => {
        toast(`Connection Error`, { type: "error"})
      })
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        if(name==="startTime" || name==="endTime"){
            const hr= (value.split(':'))[0];
            setFormData((prevState) => ({ ...prevState, [name]: (hr+":00") }));
        }
        else{
            setFormData((prevState) => ({ ...prevState, [name]: value }));
        }
      };
      const formatDate = (inputDate) => {
        const parts = inputDate.split('-'); // Split the input value by hyphens
        const dd = String(parts[2]).padStart(2, '0'); // Extract day and ensure two digits with leading zero if needed
        const mm = String(parts[1]).padStart(2, '0'); // Extract month and ensure two digits with leading zero if needed
        const yyyy = parts[0]; // Extract year
        return `${dd}/${mm}/${yyyy}`; // Format as "dd mm yyyy"
    };
      const handleDateChange = (e)=>{
        setFormData((prevState) => ({ ...prevState, date: e.target.value }));
        setDate(e.target.value);
      }
  
  return (
    <div className="container mx-auto  h-auto">
            <Card color="transparent" shadow={true} className="my-2 mx-auto w-full max-w-[27rem]">
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
                                            <Typography variant="h6" color="blue-gray" className="mb-1">
                                                Task Description
                                            </Typography>
                                            <Textarea
                                                variant="outlined"
                                                label = ""
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
                                                Date
                                            </Typography>
                                            <Input
                                                name = "date"
                                                value = {date}
                                                type= "date"
                                                size="lg"
                                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                                labelProps={{
                                                    className: "before:content-none after:content-none",
                                                }}
                                                onChange = {handleDateChange}
                                            />
                                            {error.date && (
                                                <ErrorMessage error= {error.date}/>
                                            )}
                                        </div>
                                        <div className="flex">
                                        <div>
                                            <Typography variant="h6" color="blue-gray" className="mb-1">
                                                Start Time
                                            </Typography>
                                            <Input
                                                name = "startTime"
                                                value = {formData.startTime}
                                                type= "time"
                                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900 max-w-[90%]"
                                                labelProps={{
                                                    className: "before:content-none after:content-none",
                                                }}
                                                onChange = {handleChange}
                                            />
                                            {error.startTime && (
                                                <ErrorMessage error= {error.startTime}/>
                                            )}
                                        </div>
                                        <div>
                                            <Typography variant="h6" color="blue-gray" className="mb-1">
                                                End Time
                                            </Typography>
                                            <Input
                                                name = "endTime"
                                                value = {formData.endTime}
                                                type= "time"
                                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900 max-w-[90%]"
                                                labelProps={{
                                                    className: "before:content-none after:content-none",
                                                }}
                                                onChange = {handleChange}
                                            />
                                            {error.endTime && (
                                                <ErrorMessage error= {error.endTime}/>
                                            )}
                                        </div>
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
                            <form className="mt-12 flex flex-col gap-4" onKeyDown={(e) => e.preventDefault()} onSubmit = {handleSubmit}>
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
                                            <Typography variant="h6" color="blue-gray" className="mb-1">
                                                Activity Description
                                            </Typography>
                                            <Textarea 
                                                variant= 'outlined'
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
                                                Date
                                            </Typography>
                                            <Input
                                                name = "date"
                                                value = {date}
                                                type= "date"
                                                size="lg"
                                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                                labelProps={{
                                                    className: "before:content-none after:content-none",
                                                }}
                                                onChange = {handleDateChange}
                                            />
                                            {error.date && (
                                                <ErrorMessage error= {error.date}/>
                                            )}
                                        </div>
                                        <div className="flex">
                                        <div>
                                            <Typography variant="h6" color="blue-gray" className="mb-1">
                                                Start Time
                                            </Typography>
                                            <Input
                                                name = "startTime"
                                                value = {formData.startTime}
                                                type= "time"
                                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900 max-w-[90%]"
                                                labelProps={{
                                                    className: "before:content-none after:content-none",
                                                }}
                                                onChange = {handleChange}
                                            />
                                            {error.startTime && (
                                                <ErrorMessage error= {error.startTime}/>
                                            )}
                                        </div>
                                        <div>
                                            <Typography variant="h6" color="blue-gray" className="mb-1">
                                                End Time
                                            </Typography>
                                            <Input
                                                name = "endTime"
                                                value = {formData.endTime}
                                                type= "time"
                                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900 max-w-[90%]"
                                                labelProps={{
                                                    className: "before:content-none after:content-none",
                                                }}
                                                onChange = {handleChange}
                                            />
                                            {error.endTime && (
                                                <ErrorMessage error= {error.endTime}/>
                                            )}
                                        </div>
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