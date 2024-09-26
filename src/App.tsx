import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./assets/User/Login";
import User from "./assets/User/User";
import Admin from "./assets/Admin/Admin";
import AdminCategory from "./assets/Admin/AdminCategory";
import AdminSubCategory from "./assets/Admin/AdminSubCategory";
import AdminItems from "./assets/Admin/AdminItems";
import AdminUserProfile from "./assets/Admin/AdminUserProfile";
import AdminAttendee from "./assets/Admin/AdminAttendee";
import Category from "./assets/User/Category";
import SubCategory from "./assets/User/SubCategory";
import Items from "./assets/User/Items";
import Order from "./assets/User/Order";
import { ProtectedRoute } from "./HandleApi/Api";
import AdminOrder from "./assets/Admin/AdminOrder";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="Admin">
                <Admin />
              </ProtectedRoute>
            }
          >
            <Route path="category" element={<AdminCategory />} />
            <Route path="category" element={<AdminCategory />} />
            <Route path="sub-category" element={<AdminSubCategory />} />
            <Route path="attendee" element={<AdminAttendee />} />
            <Route path="items" element={<AdminItems />} />
            <Route path="user-profiles" element={<AdminUserProfile />} />
            <Route path="order" element={<AdminOrder />} />
          </Route>
          <Route
            path="/user"
            element={
              <ProtectedRoute role="User">
                <User />
              </ProtectedRoute>
            }
          >
            <Route path="category" element={<Category />} />
            <Route path="sub-category" element={<SubCategory />} />
            <Route path="items" element={<Items />} />
            <Route path="order" element={<Order />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
