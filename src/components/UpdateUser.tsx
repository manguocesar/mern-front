import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { CreatedUser, UpdateUserType } from '../types';
import CloseIcon from '@mui/icons-material/Close';

export default function UpdateUser({ user, updatePannel, index }:UpdateUserType) {
    
    const {
        register,
        handleSubmit,
        formState: { errors }
      } = useForm();
    
  const updateUser = useCallback(async (newUserInfo: CreatedUser | any, userId: number) => {
    let token = localStorage.getItem("token")
        const userUpdatedInfo = {
          userName: newUserInfo.userName,
          age: newUserInfo.age,
          isDev: newUserInfo.isDev === "yes" ? true : false
        };
        await fetch(`http://localhost:8000/api/customer/${userId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({userUpdatedInfo,token})
        });
  }, []);
  
    return (
  <>
    {updatePannel === index && <div className="update_user_ctn">
               
                <form
          className="update_user_form"
          onSubmit={handleSubmit((newUserInfo) => updateUser(newUserInfo, user._id))}
                >
            <CloseIcon />
            <h3>Update {user.userName}</h3>
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
            </div>}
            </>
  )
}
