//@ts-nocheck

import { Card,
     Typography, 
     Input, 
     Textarea, 
     Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
    Button,
    Accordion,
  AccordionHeader,
  AccordionBody, } from "@material-tailwind/react";
import NavbarDefault from "../components/NavbarDefault";
import TaskList from "../components/TaskList";
import ScheduleList from "../components/ScheduleList";
import {
    UserCircleIcon,
    Cog6ToothIcon,
    PowerIcon
  } from "@heroicons/react/24/solid";

import { useEffect, useState } from "react";
import ErrorMessage from "../components/ErrorMessage";


const profileMenuItems = [
    {
      label: "My Profile",
      icon: UserCircleIcon,
    },
    {
      label: "Edit Profile",
      icon: Cog6ToothIcon,
    },
    {
      label: "Sign Out",
      icon: PowerIcon,
    },
];

let tasks = [
    {
        id: "T1",
        title: "Task1",
        type: "task",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora consequuntur quaerat voluptas, quidem corrupti incidunt quas eaque doloribus reiciendis, officiis minima? Repudiandae distinctio, repellat porro provident natus nihil itaque fuga",
        startTime: 7,
        endTime: 10
    },
    {
        id: "T2",
        title: "Task2",
        type: "task",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora consequuntur quaerat voluptas, quidem corrupti incidunt quas eaque doloribus reiciendis, officiis minima? Repudiandae distinctio, repellat porro provident natus nihil itaque fuga",
        startTime: 12,
        endTime: 15
    },
    {
        id: "T3",
        title: "Task3",
        type: "task",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora consequuntur quaerat voluptas, quidem corrupti incidunt quas eaque doloribus reiciendis, officiis minima? Repudiandae distinctio, repellat porro provident natus nihil itaque fuga",
        startTime: 14,
        endTime: 18
    }
]

let experiences = [
    {
        id: "E1",
        title: "Experience1",
        type: "exp",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora consequuntur quaerat voluptas, quidem corrupti incidunt quas eaque doloribus reiciendis, officiis minima? Repudiandae distinctio, repellat porro provident natus nihil itaque fuga",
        startTime: 7,
        endTime: 10
    },
    {
        id: "E2",
        title: "Experience2",
        type: "exp",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora consequuntur quaerat voluptas, quidem corrupti incidunt quas eaque doloribus reiciendis, officiis minima? Repudiandae distinctio, repellat porro provident natus nihil itaque fuga",
        startTime: 12,
        endTime: 15
    },
    {
        id: "E3",
        title: "Experience3",
        type: "exp",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora consequuntur quaerat voluptas, quidem corrupti incidunt quas eaque doloribus reiciendis, officiis minima? Repudiandae distinctio, repellat porro provident natus nihil itaque fuga",
        startTime: 14,
        endTime: 18
    }
]

let hotels = [
    {
        id: "H1",
        title: "Hotel1",
        type: "hotel",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora consequuntur quaerat voluptas, quidem corrupti incidunt quas eaque doloribus reiciendis, officiis minima? Repudiandae distinctio, repellat porro provident natus nihil itaque fuga",
        startTime: 24,
        endTime: 24
    },
    {
        id: "H2",
        title: "Hotel2",
        type: "hotel",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora consequuntur quaerat voluptas, quidem corrupti incidunt quas eaque doloribus reiciendis, officiis minima? Repudiandae distinctio, repellat porro provident natus nihil itaque fuga",
        startTime: 24,
        endTime: 24
    },
    {
        id: "H3",
        title: "Hotel3",
        type: "hotel",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora consequuntur quaerat voluptas, quidem corrupti incidunt quas eaque doloribus reiciendis, officiis minima? Repudiandae distinctio, repellat porro provident natus nihil itaque fuga",
        startTime: 24,
        endTime: 24
    }
]



 const QuestForm = ()=>{
    const [formData, setFormData] = useState({
        title: "",
        desc: "",
        duration: 0,
        plan: []
    });

    const [error, setError]=useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
        if(name==="duration"){
            var sz=value==""? 0: parseInt(value);
            
            const arr = Array.from({ length: sz }, (_, index) => ({
                label: `Day ${index + 1}`, // Add 1 to index to start from Day 1
                value: `${index + 1}`, // Add 1 to index to start from day 1
                content: [],
                isFree: new Array(24).fill(0),
                hotelBooked: false,
            }));
            setFormData((prevState) => ({ ...prevState, plan: arr }))
            setDay(1);
        }
      };
      const [open, setOpen] = useState(1);
 
    const handleOpen = (value) => setOpen(open === value ? 0 : value);

    const [day, setDay]= useState(1);
    const handleTabClick = (index) =>{
        setDay(index)
    }



    const handleList = (item)=>{
        if(formData.duration==="" || formData.duration===0){
            setError("Please Enter duration of the Quest");
        }
        else{
            let flag=true;
        if(item.type==="hotel" && ((formData.plan)[day-1]).hotelBooked){
            flag=false;
            setError('Hotel already booked for the day');
        }
        else if(item.type==="hotel"){
            setError('');
            const updatedPlan= [...formData.plan];
            updatedPlan[day-1].content.push(item);
            updatedPlan[day-1].hotelBooked=true;
            updatedPlan[day-1].content.sort((a, b)=>a.startTime-b.startTime)
            setFormData((prevState) => ({ ...prevState, plan: updatedPlan }));
            hotels=hotels.filter((hotel)=> hotel.id!==item.id);
        }
        else{
            for(let i=item.startTime;i<item.endTime;i++){
                if(((formData.plan)[day-1]).isFree[i]===1){
                    setError('Time Slot is not free');
                    flag=false;
                }
            }
            if(flag){
                setError('');
                const updatedPlan= [...formData.plan];
                updatedPlan[day-1].content.push(item);
                for(let i=item.startTime;i<item.endTime;i++){
                    (updatedPlan[day-1]).isFree[i]=1;
                }
                updatedPlan[day-1].content.sort((a, b)=>a.startTime-b.startTime)
                setFormData((prevState) => ({ ...prevState, plan: updatedPlan }));
                if(item.type==="task"){
                    tasks=tasks.filter(task=> task.id!==item.id);
                }
                else{
                    experiences=experiences.filter((exp)=> exp.id!==item.id);
                }
            }
        }
        }
    }
    
    const handleDelete= (index)=>{
        const updatedPlan = [...formData.plan];
        if(updatedPlan[day-1].content[index].type==="hotel"){
            updatedPlan[day-1].hotelBooked=false;
            hotels.push(updatedPlan[day-1].content[index]);
        }
        else{
            for(let i=updatedPlan[day-1].content[index].startTime;i<updatedPlan[day-1].content[index].endTime;i++){
                (updatedPlan[day-1]).isFree[i]=0;
            }
            if(updatedPlan[day-1].content[index].type==="task"){
                tasks.push(updatedPlan[day-1].content[index]);
            }
            else{
                experiences.push(updatedPlan[day-1].content[index]);
            }
        }
        // Remove the item at the specified index
        updatedPlan[day-1].content.splice(index, 1)
        // Update the state with the modified list
        setError("");
        setFormData((prevState) => ({ ...prevState, plan: updatedPlan }));
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
    }

    return (
        <div className="container mx-auto h-[100vh]">
            <div className="w-full lg:flex h-[85%]">
                <div className="w-full lg:w-1/2">
                    <Accordion open={open === 1}>
                        <AccordionHeader onClick={() => handleOpen(1)}>Tasks</AccordionHeader>
                        <AccordionBody>
                            <TaskList list = {tasks} onListClick={handleList} />
                        </AccordionBody>
                    </Accordion>
                    <Accordion open={open === 2}>
                        <AccordionHeader onClick={() => handleOpen(2)}>
                             Experiences
                        </AccordionHeader>
                        <AccordionBody>
                        <TaskList list = {experiences} onListClick={handleList} />
                        </AccordionBody>
                    </Accordion>
                    <Accordion open={open === 3}>
                        <AccordionHeader onClick={() => handleOpen(3)}>
                            Hotels
                        </AccordionHeader>
                        <AccordionBody>
                        <TaskList list = {hotels} onListClick={handleList} />
                        </AccordionBody>
                    </Accordion>
                </div>
                <div className="w-full lg:w-1/2 overflow-y-scroll p-5">
                    <Card color="transparent" shadow={false} className="pb-3">
                        <form className="mx-auto mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit}>
                            <div className="mb-1 flex flex-col gap-6">
                                <Input
                                    name= "title"
                                    label="Quest Title"
                                    size="lg"
                                    placeholder=""
                                    value= {formData.title}
                                    onChange = {handleChange}
                                />
                                <Textarea name="desc" size="lg" label="Quest Description" value= {formData.desc} onChange = {handleChange}/>
                                <Input name="duration" size="lg" label="Duration" type="number" placeholder="Enter number of days..." value={formData.duration} onChange= {handleChange}/>
                                {
                                    formData.duration!="" && formData.duration>0 ? (
                                        <Card>
                                            <Tabs value="1">
                                                <TabsHeader>
                                                    {(formData.plan).map(({label,value}) => (
                                                    <Tab key={value} value={value} onClick={()=>handleTabClick(parseInt(value))}>
                                                        {label}
                                                    </Tab>
                                                    ))}
                                                </TabsHeader>
                                                <TabsBody>
                                                    {(formData.plan).map(({ label, value, content }) => (
                                                    <TabPanel key={value} value={value}>
                                                        <ScheduleList list={content} deleteItem={handleDelete}/>
                                                    </TabPanel>
                                                    ))}
                                                </TabsBody>
                                            </Tabs>
                                        </Card>
                                    ) : null
                                }
                                {
                                    error ? <ErrorMessage error={error}/> : null
                                }
                                
                            </div>
                            <Button type="submit" className="mt-6" fullWidth>
                                Create Quest
                            </Button>
                        </form>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default QuestForm;