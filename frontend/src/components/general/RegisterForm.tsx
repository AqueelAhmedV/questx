// @ts-nocheck
import {
    Card,
    Input,
    CardBody,
    CardHeader,
    Checkbox,
    Button,
    Typography,
    Tabs,
    Tab,
    TabsHeader
} from '@material-tailwind/react'
import { Link } from 'react-router-dom'

export function RegisterForm({ formData, handleChange, setFormData, handleSubmit, error, isFormValid }) {

    return (
        <Card color="transparent" shadow className="my-2  w-max mx-auto max-w-full">
                <CardHeader
                        floated={false}
                        shadow={false}
                        className="m-0 grid place-items-center  text-center"
                    >
                    <Typography variant="h4" color="blue-gray" className="w-max">
                        Sign Up
                    </Typography>
                    <Typography color="gray" className="mt-1 font-normal w-max">
                        Nice to meet you! Enter your details to Sign up.
                    </Typography>
                </CardHeader>
                <CardBody>
                <form className="mt-3 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit = {handleSubmit}>
                    <div className="mb-1 flex flex-col gap-4">
                        <div>
                            <Typography variant="h6" color="blue-gray" className="mb-1">
                                First Name
                            </Typography>
                            <Input
                                name = "firstName"
                                value = {formData.firstName}
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
                        <div>
                            <Typography variant="h6" color="blue-gray" className="mb-1">
                                Last Name
                            </Typography>
                            <Input
                                name = "lastName"
                                value = {formData.lastName}
                                size="lg"
                                placeholder="Doe"
                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                                onChange = {handleChange}
                            />
                        </div>
                        <div>
                        <Typography variant="h6" color="blue-gray" className="mb-1">
                                I want to join as a:
                            </Typography>
                        <Tabs value={formData.userType}>
                            <TabsHeader>
                                <Tab value="member" onClick={() => setFormData((prevState) => ({ ...prevState, userType: 'member' }))}>
                                    Member
                                </Tab>
                                <Tab value="cm" onClick={() => setFormData((prevState) => ({ ...prevState, userType: 'cm' }))}>
                                    Community Manager
                                </Tab>
                            </TabsHeader>
                        </Tabs>
                        </div>
                        <div>
                            <Typography variant="h6" color="blue-gray" className="mb-1">
                                Email
                            </Typography>
                            <Input
                                name = "email"
                                value = {formData.email}
                                size="lg"
                                placeholder="name@mail.com"
                                className=" !border-blue-gray-200 focus:!border-gray-900"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                                onChange = {handleChange}
                            />
                            {error.email && (
                                <ErrorMessage error= {error.email}/>
                            )}
                        </div>
                        
                        <div>
                            <Typography variant="h6" color="blue-gray" className="mb-1">
                                Password
                            </Typography>
                            <Input
                                name = "password"
                                value = {formData.password}
                                type="password"
                                size="lg"
                                placeholder="********"
                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                labelProps={{
                                className: "before:content-none after:content-none",
                                }}
                                onChange = {handleChange}
                            />
                            {error.password && (
                                <ErrorMessage error= {error.password}/>
                            )}
                        </div>
                        
                        <div>
                            <Typography variant="h6" color="blue-gray" className="mb-1">
                                Confirm Password
                            </Typography>
                            <Input
                                name = "password2"
                                value = {formData.password2}
                                type="password"
                                size="lg"
                                placeholder="********"
                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                labelProps={{
                                className: "before:content-none after:content-none",
                                }}
                                
                                onChange = {handleChange}
                                error = {error.password2 !=="" ? true : false}
                            />
                            {error.password2 && (
                                <ErrorMessage error= {error.password2}/>
                            )}
                        </div>
                    </div>
                    
                    <Button type="submit" className="mt-6" fullWidth  disabled={!isFormValid()}>
                        Sign Up
                    </Button>
                    <Typography color="gray" className="mt-4 text-center font-normal">
                    Already have an account?{" "}
                    <Link to='/login'
                        className="font-medium text-gray-900"
                    >
                        Sign in
                    </Link>
                    </Typography>
                </form>
                </CardBody>
                
            </Card>
    )
}