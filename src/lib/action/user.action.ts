"use server"

import { cookies } from "next/headers";
import { User } from "../models/User";

export const getCurrentUser = async () => {
  const a = await fetch("http://localhost:8080/api/user/getUser", {
    method:"GET"
  })
console.log(a)
    const cookieUser = cookies().get("user");
    const user = cookieUser ? (cookieUser.value as unknown as User) : null;
    return {
      user,
    };
  };