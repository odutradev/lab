import { BrowserRouter, Routes, Route, Navigate, Outlet} from "react-router-dom";

import SignIn from "../pages/signIn";
import SignUp from "../pages/signUp";

const Router = () => {
    const PrivateRoute = () => localStorage.getItem("token") != null ? <Outlet  /> : <Navigate to="/signin" />;
    
    return(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn/>}/>
          <Route path="/signin" element={<SignIn/>}/>
          <Route path="/signup" element={<SignUp/>}/>


          <Route element={<PrivateRoute  />}>

          </Route>

        </Routes>
      </BrowserRouter>
    );
};

export default Router