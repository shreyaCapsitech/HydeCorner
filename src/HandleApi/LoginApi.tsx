import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const baseUrl = "https://localhost:7018/api/Login";

const fetchLogins = async () => {
    const { data } = await axios.get(`${baseUrl}`);
    return data;
  };
   
  export const useGetLogins = () => {
    return useQuery({queryKey:  ['logins'], queryFn: fetchLogins});

  };