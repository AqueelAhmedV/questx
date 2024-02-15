//@ts-nocheck
import { Link } from 'react-router-dom';
import {
    Button,
    Typography,
} from '@material-tailwind/react'

const Main = ()=>{
    return (
        <>
            <div className="container  flex">
                <div className="md:w-1/2 p-10">
                    <Typography color= "blue-gray">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim odit nisi sunt soluta recusandae sit voluptatem harum, similique natus libero! Error, itaque repellat? Consectetur, quae quaerat repellat sequi ducimus similique.
                    </Typography>
                    <Link to = '/expForm'>
                        <Button className='float-right mr-5 mt-10'>
                            Add Task
                        </Button>
                    </Link>
                </div>
            </div>
           
            
        </>
    )
}

export default Main;