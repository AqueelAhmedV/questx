// @ts-nocheck  
import { useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { useAuth } from "../contexts/AuthContext";
import { RegisterForm } from "../components/general/RegisterForm";

// import { useProfile } from "../contexts/ProfileContext";


export const Register = () => {
    const [formData, setFormData] = useState({
        firstName : "",
        lastName : "",
        email : "",
        password: "",
        password2: "",
        userType: "member"
    })
    const [error, setError] = useState({
        firstName : "",
        email : "",
        password : "",
        password2 : "",
    });
    const location = useLocation();

    const auth = useAuth();
    

    const handleSubmit= (e) =>{
      e.preventDefault();
      if(formData.password2 !== formData.password){
        return setError((prevState) => ({...prevState, password2 : "passwords should match"}));
      }
      else{
        setError((prevState) => ({...prevState, password2 : ""}))
        auth.register({
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            user_type: formData.userType,
            password: formData.password
        })
        .catch((err)=>{
          setError(err)
          console.log(err);
        })
      }
      
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
      };

    const isFormValid = () => {
        return formData.firstName && formData.email && formData.password && formData.password2
    }

    if (auth.user)
        return <Navigate to={`/${auth.user.user_type}/home`} />

    return (
        <div className="container mx-auto">         
            <RegisterForm 
            setFormData={setFormData}
            formData={formData} 
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            error={error}
            isFormValid={isFormValid}/>
        </div>
  );
}
