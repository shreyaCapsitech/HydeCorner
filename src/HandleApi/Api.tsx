import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { message } from "antd";
 
const baseUrl = "https://localhost:7018/api";
 
// //Fetch logins
// const fetchLogins = async () => {
//   try {
//     const { data } = await axios.get(`${baseUrl}/Login`);
//     return data;
//   } catch (error) {
//     throw new Error("Error fetching logins");
//   }
// };
 
// //React Query hook for getting logins
// export const useGetLogins = () => {
//   return useQuery({
//     queryKey: ["logins"],
//     queryFn: fetchLogins,
//     // onError: (error) => {
//     //   message.error(error.message || "An error occurred while fetching logins");
//     // }
//   });
// };
 

export const userLogin = async (payload: any) => {
  try {
const { data } = await axios.post(`${baseUrl}/Login/authenticate`, payload);
    return data;
  } catch (error) {
    throw new Error("Error logging in");
  }
};
 

export const useLogin = () =>
  useMutation({
    mutationFn: userLogin,
    onError: (error) => {
      message.error(error.message || "Login failed");
    },
  });

// Categories api functions

  export const fetchCategories = async () => {
    const response = await axios.get(`${baseUrl}/Category`);
    return response.data;
};
 
export const fetchCategoryById = async (id: string) => {
    const response = await axios.get(`${baseUrl}/Category/${id}`);
    return response.data;
};
 
export const addCategory = async (category: any) => {
const response = await axios.post(`${baseUrl}/Category`, category);
    return response.data;
};
 
export const editCategory = async (id: string, category: any) => {
    const response = await axios.put(`${baseUrl}/Category/${id}`, category);
    return response.data;
};
 
export const deleteCategory = async (id: string) => {
    const response = await axios.delete(`${baseUrl}/Category/${id}`);
    return response.data;
};

export const useCategories = () => {
  return useQuery({queryKey: ["categories"],queryFn: fetchCategories});
};

export const useCategory = (id: string) => {
  return useQuery({queryKey: ["category", id],queryFn: () => fetchCategoryById(id), 
      enabled: !!id,  // only run if id is truthy
  });
};


// Subcategory api functions 

export const fetchSubCategories = async () => {
    const response = await axios.get(`${baseUrl}/SubCategory`);
    return response.data;
};
 
export const fetchSubCategoryById = async (id: string) => {
    const response = await axios.get(`${baseUrl}/SubCategory/${id}`);
    return response.data;
};
 
export const addSubCategory = async (subcategory: any) => {
const response = await axios.post(`${baseUrl}/SubCategory`, subcategory);
    return response.data;
};
 
export const editSubCategory = async (id: string, subcategory: any) => {
    const response = await axios.put(`${baseUrl}/SubCategory/${id}`, subcategory);
    return response.data;
};
 
export const deleteSubCategory = async (id: string) => {
    const response = await axios.delete(`${baseUrl}/SubCategory/${id}`);
    return response.data;
};

export const useSubCategories = () => {
  return useQuery({queryKey: ["subcategories"],queryFn: fetchSubCategories});
};

export const useSubCategory = (id: string) => {
  return useQuery({queryKey: ["subcategory", id],queryFn: () => fetchSubCategoryById(id), 
      enabled: !!id,  // only run if id is truthy
  });
};

// Items api functions 

export const fetchItems = async () => {
  const response = await axios.get(`${baseUrl}/Item`);
  return response.data;
};

export const fetchItemById = async (id: string) => {
  const response = await axios.get(`${baseUrl}/Item/${id}`);
  return response.data;
};

export const addItem = async (item: any) => {
const response = await axios.post(`${baseUrl}/Item`, item);
  return response.data;
};

export const editItem = async (id: string, item: any) => {
  const response = await axios.put(`${baseUrl}/Item/${id}`, item);
  return response.data;
};

export const deleteItem = async (id: string) => {
  const response = await axios.delete(`${baseUrl}/Item/${id}`);
  return response.data;
};

export const useItems = () => {
return useQuery({queryKey: ["items"],queryFn: fetchItems});
};

export const useItem = (id: string) => {
return useQuery({queryKey: ["item", id],queryFn: () => fetchItemById(id), 
    enabled: !!id,  // only run if id is truthy
});
};

// UserProfile api functions

export const fetchUserProfiles = async () => {
  const response = await axios.get(`${baseUrl}/UserProfile`);
  return response.data;
};

export const fetchUserProfileById = async (id: string) => {
  const response = await axios.get(`${baseUrl}/UserProfile/${id}`);
  return response.data;
};

export const addUserProfile = async (userProfile: any) => {
const response = await axios.post(`${baseUrl}/UserProfile`, userProfile);
  return response.data;
};

export const editUserProfile = async (id: string, userProfile: any) => {
  const response = await axios.put(`${baseUrl}/UserProfile/${id}`, userProfile);
  return response.data;
};

export const deleteUserProfile = async (id: string) => {
  const response = await axios.delete(`${baseUrl}/UserProfile/${id}`);
  return response.data;
};

export const useUserProfiles = () => {
return useQuery({queryKey: ["userProfiles"],queryFn: fetchUserProfiles});
};

export const useUserProfile = (id: string) => {
return useQuery({queryKey: ["userProfile", id],queryFn: () => fetchUserProfileById(id), 
    enabled: !!id,  // only run if id is truthy
});
};