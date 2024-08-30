import { BrowserRouter, Routes, Route, Navigate, Outlet} from "react-router-dom";

import ResetPassword from "../pages/resetPassword";
import Dashboard from "../pages/dashboard";
import Request from "../pages/requests";
import Profile from "../pages/profile";
import Logout from "../pages/logout";
import SignIn from "../pages/signIn";
import SignUp from "../pages/signUp";
import Error from "../pages/error";
import Users from "../pages/users";
import EditUser from "../pages/editUser";

const Router = () => {
    const InitialRoute = () => localStorage.getItem("token") != null ? <Navigate to="/dashboard" replace/> : <Navigate to="/signin" />;
    const PrivateRoute = () => localStorage.getItem("token") != null ? <Outlet  /> : <Navigate to="/signin" />;
    
    return(
      <BrowserRouter>
        <Routes>
          <Route path="/reset-password" element={<ResetPassword/>}/>
          <Route path="*" element={<Navigate to="/404" replace/>}/>
          <Route path="/logout" element={<Logout />}/>
          <Route path="/" element={<InitialRoute/>}/>
          <Route path="/signin" element={<SignIn/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/404" element={<Error />}/>

          <Route element={<PrivateRoute  />}>
           <Route path="/dashboard/admin/edit-user/:userID" element={<EditUser/>}/>
           <Route path="/dashboard/admin/requests" element={<Request/>}/>
           <Route path="/dashboard/admin/users" element={<Users/>}/>
           <Route path="/dashboard/profile" element={<Profile/>}/>
           <Route path="/dashboard" element={<Dashboard/>}/>
          </Route>

        </Routes>
      </BrowserRouter>
    );
};

export default Router