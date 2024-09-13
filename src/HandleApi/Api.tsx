import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const baseUrl = "https://localhost:7018/api";

// const fetchLogins = async () => {
//     const { data } = await axios.get(`${baseUrl}/Login`);
//     return data;
//   };
   
//   export const useGetLogins = () => {
//     return useQuery({queryKey:  ['logins'], queryFn: fetchLogins});

//   };

  const authenticateLogin = async (credentials: { username: string; password: string }) => {
    const { data } = await axios.post(`${baseUrl}/Login/authenticate`, credentials);
      return data; // You should get the role and other relevant user data in the response
    };
     
    export const useAuthenticateLogin = () => {
      return useMutation({mutationFn: authenticateLogin});
    };