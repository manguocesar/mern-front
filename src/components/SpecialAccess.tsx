import "./SpecialAccess.css"
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Stack } from "@mui/material";

export default function SpecialAccess() {
 const [isRegistered, setIsRegistered]=useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    
    const logIn = useCallback(async (logInInfo:any) => {
        
        const userCreatedInfo = {
           username: logInInfo.userName,
           password: logInInfo.password,
           email: logInInfo.email,
        };
        let res = await fetch(`http://localhost:8000/api/auth/${ isRegistered? "login" : "register"}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(userCreatedInfo)
        });
      let data = await res.json()
     
      localStorage.setItem("token", data.token)
      console.log("res", localStorage.getItem("token"));  
    }, [isRegistered]);

  return (
      <div className="login_ctn">
            <Stack sx={{ flexDirection: 'row' }} >
                <Button sx={{ m: "auto" }} onClick={()=>setIsRegistered(true)} variant={isRegistered ? "contained" : "outlined"}>Log In</Button>
                <Button sx={{ m: "auto" }} onClick={()=>setIsRegistered(false)} variant={!isRegistered ? "contained" : "outlined"}>Register</Button>
            </Stack>
          <form
          className="add_user_form"
          onSubmit={handleSubmit((logInInfo) => logIn(logInInfo))}
          >
              {isRegistered? <p>Login</p> : <p>SignUp</p>}
          <label>User name</label>
          <input {...register("userName", { required: true })} />
          {errors.lastName && <p>User name is required.</p>}

          <label>Password</label>
          <input {...register("password")} />
          {errors.password && <p>Please enter your password</p>}
          <label>Email</label>
          <input {...register("email")} />
          {errors.password && <p>Please enter your email</p>}
          <input type="submit" />
        </form>

      </div>
  )
}