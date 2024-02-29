//@ts-nocheck
import { Link } from 'react-router-dom';
import {
    Button,
    Typography,
} from '@material-tailwind/react'
import heroIcon from '../hero_icon.svg'

export function HeroSection() {
    return (
        <>
            <div className="container h-full grid items-center  grid-cols-2">
                <div className="px-10 pl-20 col-span-1 pb-5">
                    <Typography color= "blue-gray">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim odit nisi sunt soluta recusandae sit voluptatem harum, similique natus libero! Error, itaque repellat? Consectetur, quae quaerat repellat sequi ducimus similique.
                    </Typography>
                    <Link to = '/expForm'>
                        <Button className='float-right mr-5 mt-10'>
                            Add Task/Activity
                        </Button>
                    </Link>
                </div>
                <div className='px-10 pl-20 col-span-1 border-l pb-5'>
                <Typography color= "blue-gray">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim odit nisi sunt soluta recusandae sit voluptatem harum, similique natus libero! Error, itaque repellat? Consectetur, quae quaerat repellat sequi ducimus similique.
                    </Typography>
                    <Link to = '/register'>
                        <Button className='float-right mr-5 mt-10'>
                            Join Us
                        </Button>
                    </Link>
                </div>
            </div>
           
            
        </>
    )
}
