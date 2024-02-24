//@ts-nocheck

import React from 'react';

import {
    Input,
    Button,
    Typography
} from '@material-tailwind/react'

import {
    UserCircleIcon,
    Cog6ToothIcon,
    InboxArrowDownIcon,
    LifebuoyIcon,
    PowerIcon
  } from "@heroicons/react/24/solid";

import NavbarDefault from "../components/NavbarDefault";
import { Card, CardBody, CardHeader, MaterialTailwindTheme } from '@material-tailwind/react';


const UserLanding = () => {

    const qlist = [
        {
            id: 1,
            title : "Quest1",
            desc : "Just wibing",
            duration : "2 Days 3 Nights",
            cm: "Aqueel",
            cm_phone: "8119209292",
        },
        {
            id: 2,
            title : "Quest2",
            desc : "Just wibing",
            duration : "2 Days 3 Nights",
            cm: "Aqueel",
            cm_phone: "8119209292",
        }
    ]

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
          label: "Inbox",
          icon: InboxArrowDownIcon,
        },
        {
          label: "Help",
          icon: LifebuoyIcon,
        },
        {
          label: "Sign Out",
          icon: PowerIcon,
        },
      ];

      const questList = qlist.map((quest)=>{
        return (
            <Card key= {quest.id} className='p-3 mb-2'>
                <Typography as = "h5">
                    {quest.title}
                </Typography>
            </Card>
        )
      })
    
    return (
        <>
            <NavbarDefault list= {[]} isLoggedIn = {true} profileMenuItems= {profileMenuItems}/>
            <Card shadow className='mx-auto max-w-screen-xl h-[85vh]'>
                <div className='flex flex-wrap md:flex-nowrap py-2 px-10 gap-2'>
                    <Input 
                        type="search"
                        color="black"
                        label="Type here..."
                        className=" min-w-[288px]"
                    />
                    <Button size="md" className="w-[100px] rounded-lg mx-auto">
                        Search
                    </Button>
                </div>
                
                <CardBody className='h-[90%]'>
                    {questList}
                </CardBody>
            </Card>
        </>
    )
}

export default UserLanding;