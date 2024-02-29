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


export default function RegisterModal() {

  return (
    <div className="w-fit flex justify-center items-center p-2 rounded-lg">
        <Card
          color="transparent"
          shadow={false}
          className="h-[calc(100vh-2rem)] w-full p-4 overflow-y-auto"
          style={{
            scrollbarWidth: 'none'
          }}
        >
          <div className="mb-2 flex items-center gap-4 px-4 py-2">
            <Typography variant="h5" color="blue-gray">
              QuestX
            </Typography>
          </div>
          <Card className="min-h-1/2 mt-4 w-full">
            <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                    User SignUp
                </Typography>
                <Typography>
                  I create quests, and manage a community
                </Typography>
            </CardBody>
            <CardFooter className="pt-0">
              <Link to = '/register' state = { { userType : "member"}}>
                <Button>
                  Proceed
                </Button>
              </Link>
            </CardFooter>
        </Card>
        <Card className="min-h-1/2 mt-6 w-full">
            <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                    Community Manager Sign Up
                </Typography>
                <Typography>
                  I am looking for quests/local experience packages
                </Typography>
            </CardBody>
            <CardFooter className="pt-0">
            <Link to = '/register' state = { { userType : "cm"}} >
                <Button>
                  Proceed
                </Button>
              </Link>
            </CardFooter>
        </Card>
        </Card>
    </div>
  );
}