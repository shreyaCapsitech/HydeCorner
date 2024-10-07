import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { message } from "antd";
import { useSelector } from "react-redux";
import { clearUserData, Role, Token } from "../app/slice/userSlice";
import { store } from "../app/store";

const baseUrl = "https://localhost:7018/api";

const getUserToken  = async () => {
  const currentState = store.getState();
  const token = currentState?.user?.token;
  return token;
}


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

// export const userLogin = async (payload: any) => {
//   try {
// const { data } = await axios.post(`${baseUrl}/Login/authenticate`, payload);
//     return data;
//   } catch (error) {
//     throw new Error("Error logging in");
//   }
// };

// export const useLogin = () =>
//   useMutation({
//     mutationFn: userLogin,
//     onError: (error) => {
//       message.error(error.message || "Login failed");
//     },
//   });

export const UserProfile = async (payload: any) => {
  try {
    const { data } = await axios.post(
      `${baseUrl}/UserProfile/authenticate`,
      payload,
    );
    return data;
  } catch (error) {
    throw new Error("Error logging in");
  }
};

export const useUserProfile = () =>
  useMutation({
    mutationFn: UserProfile,
    onError: (error) => {
      message.error(error.message || "Login failed");
    },
  });

// Function to check if user is authenticated
// const useAuth = () => {
//   const token = localStorage.getItem("token");
//   return !!token; // returns true if token exists
// };

// // Higher-order component to protect routes
// export const ProtectedRoute = ({ children, role }: any) => {
//   const isAuthenticated = useAuth();
//   const userRole = localStorage.getItem("role");

//   if (!isAuthenticated) {
//     // Redirect to login if not authenticated
//     return <Navigate to="/" />;
//   }

//   if (role && role !== userRole) {
//     // Redirect to home page if the role doesn't match
//     return <Navigate to="/" />;
//   }

//   // Render the protected component if authentication and role are valid
//   return children;
// };

const useAuth = () => {
  const token = useSelector(Token);
  return !!token; // returns true if token exists
};

export const ProtectedRoute = ({ children, role }: any) => {

  const isAuthenticated = useAuth();
  const userRole = useSelector(Role);

  if (!isAuthenticated) {
      return <Navigate to="/" />; // Redirect to login if not authenticated
  }

  if (role && role !== userRole) {
      return <Navigate to="/" />; // Redirect if user role doesn't match
  }

  return children; // Render the protected component
};

axios.interceptors.response.use(
  response => response,
  error => {
      if (error.response.status === 401) {
          // Redirect to login on 401
          clearUserData();
          window.location.href = '/';
      }
      return Promise.reject(error);
  }
);

// Categories api functions

export const fetchCategories = async () => {
  const token = await getUserToken();
  const response = await axios.get(`${baseUrl}/Category`, {
    headers: {
        Authorization: `Bearer ${token}` // Add token to the request header
    }
});
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
  return useQuery({ queryKey: ["categories"], queryFn: fetchCategories });
};

export const useCategory = (id: string) => {
  return useQuery({
    queryKey: ["category", id],
    queryFn: () => fetchCategoryById(id),
    enabled: !!id, // only run if id is truthy
  });
};

// Subcategory api functions

export const fetchSubCategories = async () => {
  const token = await getUserToken();
  const response = await axios.get(`${baseUrl}/SubCategory`, {
    headers: {
        Authorization: `Bearer ${token}` // Add token to the request header
    }
});
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
  return useQuery({ queryKey: ["subcategories"], queryFn: fetchSubCategories });
};

export const useSubCategory = (id: string) => {
  return useQuery({
    queryKey: ["subcategory", id],
    queryFn: () => fetchSubCategoryById(id),
    enabled: !!id, // only run if id is truthy
  });
};

// Items api functions

export const fetchItems = async () => {
  const token = await getUserToken();
  const response = await axios.get(`${baseUrl}/Item`, {
    headers: {
        Authorization: `Bearer ${token}` // Add token to the request header
    }
});
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
  return useQuery({ queryKey: ["items"], queryFn: fetchItems });
};

export const useItem = (id: string) => {
  return useQuery({
    queryKey: ["item", id],
    queryFn: () => fetchItemById(id),
    enabled: !!id, // only run if id is truthy
  });
};

// UserProfile api functions

// export const fetchUserProfiles = async () => {
//   const response = await axios.get(`${baseUrl}/UserProfile`);
//   return response.data;
// };

export const fetchUserProfiles = async () => {
  const token = await getUserToken();
  const response = await axios.get(`${baseUrl}/UserProfile`, {
      headers: {
          Authorization: `Bearer ${token}` // Add token to the request header
      }
  });
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
  return useQuery({ queryKey: ["userProfiles"], queryFn: fetchUserProfiles });
};

// export const useUserProfile = (id: string) => {
// return useQuery({queryKey: ["userProfile", id],queryFn: () => fetchUserProfileById(id),
//     enabled: !!id,  // only run if id is truthy
// });
// };

// Attendee api functions

export const fetchAttendees = async () => {
  const token = await getUserToken();
  const response = await axios.get(`${baseUrl}/Attendee`, {
    headers: {
        Authorization: `Bearer ${token}` // Add token to the request header
    }
});
  return response.data;
};

export const fetchAttendeeById = async (id: string) => {
  const response = await axios.get(`${baseUrl}/Attendee/${id}`);
  return response.data;
};

export const addAttendee = async (attendee: any) => {
  const response = await axios.post(`${baseUrl}/Attendee`, attendee);
  return response.data;
};

export const editAttendee = async (id: string, attendee: any) => {
  const response = await axios.put(`${baseUrl}/Attendee/${id}`, attendee);
  return response.data;
};

export const deleteAttendee = async (id: string) => {
  const response = await axios.delete(`${baseUrl}/Attendee/${id}`);
  return response.data;
};

export const useAttendees = () => {
  return useQuery({ queryKey: ["attendees"], queryFn: fetchAttendees });
};

export const useAttendee = (id: string) => {
  return useQuery({
    queryKey: ["attendee", id],
    queryFn: () => fetchAttendeeById(id),
    enabled: !!id, // only run if id is truthy
  });
};

// Order api functions

export const fetchOrders = async () => {
  const token = await getUserToken();
  const response = await axios.get(`${baseUrl}/Order`, {
    headers: {
        Authorization: `Bearer ${token}` // Add token to the request header
    }
});
  return response.data;
};

export const fetchOrderById = async (id: string) => {
  const response = await axios.get(`${baseUrl}/Order/${id}`);
  return response.data;
};

export const addOrder = async (order: any) => {
  const token = await getUserToken();
const response = await axios.post(`${baseUrl}/Order`, order, {
      headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const editOrder = async (id: string, item: any) => {
  const response = await axios.put(`${baseUrl}/Order/${id}`, item);
  return response.data;
};

export const deleteOrder = async (id: string) => {
  const response = await axios.delete(`${baseUrl}/Order/${id}`);
  return response.data;
};

export const useOrders = () => {
  return useQuery({ queryKey: ["order"], queryFn: fetchOrders });
};

export const useOrder = (id: string) => {
  return useQuery({
    queryKey: ["order", id],
    queryFn: () => fetchOrderById(id),
    enabled: !!id, // only run if id is truthy
  });
};

// change password


