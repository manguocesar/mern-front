import { useCallback, useState } from "react";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { CreatedUser } from "../types";

export default function AddingUser() {
  const [addUserForm, setAddUserForm] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const createUser = useCallback(async (newUserInfo: CreatedUser | any) => {
    let token = localStorage.getItem("token")
    const userCreatedInfo = {
      userName: newUserInfo.userName,
      age: newUserInfo.age,
      isDev: newUserInfo.isDev === "yes" ? true : false
    };
    await fetch("http://localhost:8000/api/customer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({userCreatedInfo,token})
    });
  }, []);

  return (
    <>
      <Button onClick={() => setAddUserForm(!addUserForm)}>Adding a new user?</Button>
      {addUserForm && (
        <form
          className="add_user_form"
          onSubmit={handleSubmit((newUserInfo) => createUser(newUserInfo))}
        >
          <label>What is your name?</label>
          <input {...register("userName", { required: true })} />
          {errors.lastName && <p>Last name is required.</p>}

          <label>How hold are you</label>
          <input {...register("age", { pattern: /\d+/ })} />
          {errors.age && <p>Please enter number for age.</p>}
          <div className="checkbox_form">
            <label>Yes</label>
            <input
              {...register("isDev", { required: true })}
              type="radio"
              value="Yes"
            />
            <label>Are you a dev?</label>
            <input
              {...register("isDev", { required: true })}
              type="radio"
              value="No"
            />
            <label>No</label>
            {errors.lastName && <p>"Are you a dev?" is required.</p>}
          </div>
          <input type="submit" />
        </form>
      )}
    </>
  );
}
