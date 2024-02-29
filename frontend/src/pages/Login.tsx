// @ts-nocheck
import {
    Card,
    CardHeader,
    CardBody,
    Input,
    Checkbox,
    Button,
    Typography,
    Tabs,
    TabsHeader,
    Tab
} from "@material-tailwind/react";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { useAuth } from "../contexts/AuthContext";
import { useProfile } from "../contexts/ProfileContext";


export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userType, setUserType] = useState('member')
    const [error, setError] = useState("");
 
     const auth = useAuth()
     const { setShowNavbar } = useProfile()
     setShowNavbar(false)

    const handleSubmit= (e) =>{
      e.preventDefault();

      //backend code
      if(email !== "" && password !==""){
        setError("");
        auth.login({
            email,
            password,
            user_type: userType
        })
        console.log("User logined");
      } else {
        setError("Invalid email or password");
      }
      
    }

    const isFormValid = () =>{
      console.log(password.value.length);
      return password.value.length >=8;
    }
    if (auth.user)
        return <Navigate to={`/${auth.user.user_type}/home`} />
    return (
        <div className="container">
            <Card className="my-2 mx-auto w-max max-w-full" color="transparent" shadow>
                <CardHeader
                        floated={false}
                        shadow={false}
                        className="m-0 grid place-items-center  text-center"
                    >
                    <Typography variant="h4" color="blue-gray" className="w-max">
                        Sign In
                    </Typography>
                    <Typography color="gray" className="mt-1 font-normal w-max">
                        Nice to meet you! Enter your details to Sign in.
                    </Typography>
                </CardHeader>
                <CardBody >
                    <form className="mt-3 mb-2 w-80 max-w-screen-lg sm:w-calc(100vw-2rem)" onSubmit = {handleSubmit}>
                        <div className="mb-1 flex flex-col gap-3">
                            <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Email
                            </Typography>
                            <Input
                            name = "email"
                            value = {email}
                            size="lg"
                            placeholder="name@mail.com"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            onChange = {(e) => {setEmail(e.target.value)}}
                            />
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Password
                        </Typography>
                        <Input
                            name = "password"
                            value = {password}
                            type="password"
                            size="lg"
                            placeholder="********"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                            className: "before:content-none after:content-none",
                            }}
                            onChange = {(e) => {setPassword(e.target.value)}}
                        />
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            User Type
                        </Typography>
                        <Tabs className='min-w-max' value={userType}>
                            <TabsHeader className='min-w-fit'>
                                <Tab className='min-w-fit' value="member" onClick={() => setUserType('member')}>
                                    Member
                                </Tab>
                                <Tab className='min-w-fit' value="cm" onClick={() => setUserType('cm')}>
                                    Community Manager
                                </Tab>
                            </TabsHeader>
                        </Tabs>
                        </div>
                        {error && (
                            <ErrorMessage error = {error}/>
                        )}
                        <div>
                        
                        </div>
                        <Button type="submit" className="mt-6" fullWidth disabled = {!isFormValid}>
                        Sign In
                        </Button>
                        <Typography color="gray" className="mt-4 text-center font-normal">
                        Dont have an account?{" "}
                        <Link to = '/register'
                            className="font-medium text-gray-900"
                        >
                            Sign Up
                        </Link>
                        </Typography>
                    </form>
                </CardBody>
                
            </Card>
        </div>
  );
}
