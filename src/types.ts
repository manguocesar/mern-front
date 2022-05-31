import { Dispatch, SetStateAction } from "react";

export interface User extends CreatedUser {
    _id: any
  }

export type CreatedUser = {
    userName: string,
    age: string,
    isDev: string,
}
  
export type UpdateUserType = {
    updatePannel: number|undefined,
    index: number,
    user: User,
}

export interface DeleteModal {
    deleteUserId: number|undefined;
    deleteModal: boolean;
    setDeleteModal: Dispatch<SetStateAction<boolean>>;
}