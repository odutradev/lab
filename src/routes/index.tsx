import { BrowserRouter, Routes, Route, Navigate, Outlet} from "react-router-dom";

import Dashboard from "../pages/dashboard";
import SignIn from "../pages/signIn";
import SignUp from "../pages/signUp";
import Error from "../pages/error";

const Router = () => {
    const PrivateRoute = () => localStorage.getItem("token") != null ? <Outlet  /> : <Navigate to="/signin" />;
    
    return(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/signin" replace/>}/>
          <Route path="*" element={<Navigate to="/404" replace/>}/>
          <Route path="/signin" element={<SignIn/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/404" element={<Error />}/>

          <Route element={<PrivateRoute  />}>
           <Route path="/dashboard" element={<Dashboard/>}/>
          </Route>

        </Routes>
      </BrowserRouter>
    );
};

export default Router