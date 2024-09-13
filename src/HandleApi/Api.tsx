import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { message } from "antd";
 
const baseUrl = "https://localhost:7018/api";
 
// Fetch logins
const fetchLogins = async () => {
  try {
    const { data } = await axios.get(`${baseUrl}/Login`);
    return data;
  } catch (error) {
    throw new Error("Error fetching logins");
  }
};
 
// React Query hook for getting logins
export const useGetLogins = () => {
  return useQuery({
    queryKey: ["logins"],
    queryFn: fetchLogins,
    // onError: (error) => {
    //   message.error(error.message || "An error occurred while fetching logins");
    // }
  });
};
 
// User login function
export const userLogin = async (payload: any) => {
  try {
const { data } = await axios.post(`${baseUrl}/Login`, payload);
    return data;
  } catch (error) {
    throw new Error("Error logging in");
  }
};
 
// React Query hook for user login mutation
export const useLogin = () =>
  useMutation({
    mutationFn: userLogin,
    onError: (error) => {
      message.error(error.message || "Login failed");
    },
  });