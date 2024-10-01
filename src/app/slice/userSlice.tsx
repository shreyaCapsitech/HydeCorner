import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
// Define the initial state type
interface UserState {
  name: string | null;
  username: string | null;
  password: string | null;
  token:  string | null;
  role: string | null;
}

// Initial state
const initialState: UserState = {
  name: null, //localStorage.getItem('name') || null,
  username: null,
  password: null,
  token: null,
  role: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserState>) => {
      state.name = action.payload.name;
      state.username = action.payload.username;
      state.password = action.payload.password;
      state.token = action.payload.token;
      state.role = action.payload.role;
      //localStorage.setItem('name', action.payload); // Update localStorage when name changes
    },
    clearUserData: (state) => {
      state.name = null;
      state.username = null;
      state.password = null;
      state.token = null;
      state.role = null;
      //localStorage.removeItem('name'); // Clear name from localStorage
    },
//     setUserName: (state, action: PayloadAction<string>) => {
//         state.username = action.payload;
//   },
//   clearUserName: (state) => {
//     state.username = null;
//   },
//   setPassword: (state, action: PayloadAction<string>) => {
//     state.password = action.payload;
// },
// clearPassword: (state) => {
// state.password = null;
// },
}
});

// Export the actions
export const { setUserData, clearUserData } = userSlice.actions;

export const Name = (state: RootState) => state.user.name;
export const UserName = (state: RootState) => state.user.username;
export const Password = (state: RootState) => state.user.password;
export const Token = (state: RootState) => state.user.token;
export const Role = (state: RootState) => state.user.role;

// Export the reducer
export default userSlice.reducer;