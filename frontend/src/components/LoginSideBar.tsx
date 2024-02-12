//@ts-noCheck

import React from "react";
import { Link } from "react-router-dom";
import {
  CardBody,
  CardFooter,
  Button,
  Typography,
  Card,
} from "@material-tailwind/react";


const [isUser, setIsUser] = React.useState(true);

export default function LoginSideBar({isLogin}) {
  return (
    <>
        <Card
          color="transparent"
          shadow={false}
          className="h-[calc(100vh-2rem)] w-full p-4"
        >
          <div className="mb-2 flex items-center gap-4 p-4">
            <Typography variant="h5" color="blue-gray">
              QuestX
            </Typography>
          </div>
          <Card className="h-50% mt-6 w-full">
            <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                    User {isLogin ? "Login": "SignUp"}
                </Typography>
                <Typography>
                The place is close to Barceloneta Beach and bus stop just 2 min by
                </Typography>
            </CardBody>
            <CardFooter className="pt-0">
              <Link to = {isLogin ? ('/login'):('/register')}>
                <Button onClick= {()=> setIsUser(true)}>
                  {isLogin? "LogIn" : "SignUp"}
                </Button>
              </Link>
            </CardFooter>
        </Card>
        <Card className="max-h-70px mt-6 w-full">
            <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                    Community Manager {isLogin ? "Login": "SignUp"}
                </Typography>
                <Typography >
                The place is close to Barceloneta Beach and bus stop just 2 min by
                </Typography>
            </CardBody>
            <CardFooter className="pt-0">
            <Link to = {isLogin ? ('/login'):('/register')}>
                <Button onClick= {()=> setIsUser(false)}>
                  {isLogin? "LogIn" : "SignUp"}
                </Button>
              </Link>
            </CardFooter>
        </Card>
        </Card>
    </>
  );
}