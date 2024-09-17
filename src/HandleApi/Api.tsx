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
 
// User login function
export const userLogin = async (payload: any) => {
  try {
const { data } = await axios.post(`${baseUrl}/Login/authenticate`, payload);
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

  export const fetchCategories = async () => {
    const response = await axios.get(`${baseUrl}/Category`);
    return response.data;
};
 
// Fetch a single category by id
export const fetchCategoryById = async (id: string) => {
    const response = await axios.get(`${baseUrl}/Category/${id}`);
    return response.data;
};
 
// Add a new category
export const addCategory = async (category: any) => {
const response = await axios.post(`${baseUrl}/Category`, category);
    return response.data;
};
 
// Edit an existing category
export const editCategory = async (id: string, category: any) => {
    const response = await axios.put(`${baseUrl}/Category/${id}`, category);
    return response.data;
};
 
// Delete a category
export const deleteCategory = async (id: string) => {
    const response = await axios.delete(`${baseUrl}/Category/${id}`);
    return response.data;
};

// Fetch all categories hook
export const useCategories = () => {
  return useQuery({queryKey: ["categories"],queryFn: fetchCategories});
};

// Fetch category by ID hook
export const useCategory = (id: string) => {
  return useQuery({queryKey: ["category", id],queryFn: () => fetchCategoryById(id), 
      enabled: !!id,  // only run if id is truthy
  });
};

// Add new category hook
export const useAddCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({mutationFn: addCategory, 
      onSuccess: () => {
          // Invalidate and refetch the categories after adding a new one
          queryClient.invalidateQueries({queryKey: ["categories"]});
      },
  });
};

// Edit existing category hook
export const useEditCategory = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({mutationFn: (category: any) => editCategory(id, category), 
      onSuccess: () => {
          // Invalidate and refetch the categories after editing one
          queryClient.invalidateQueries({queryKey: ["categories"]});
          queryClient.invalidateQueries({queryKey: ["category", id]});
      },
  });
};

// Delete category hook
export const useDeleteCategory = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({mutationFn: () => deleteCategory(id), 
      onSuccess: () => {
          // Invalidate and refetch the categories after deleting
          queryClient.invalidateQueries({queryKey: ["categories"]});
      },
  });
};


