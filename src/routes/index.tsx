import { BrowserRouter, Routes, Route, Navigate, Outlet} from "react-router-dom";

import useUserStore from "../store/user";
import routesPaths from "./routes";

const Router = () => {
    const { user } = useUserStore(x => x);

    const PrivateRoute = () => localStorage.getItem("token") != null ? <Outlet  /> : <Navigate to="/signin" />;
    const AdminRoute = () => user?.role == 'admin' ? <Outlet  /> : <Navigate to="/signin" />;
 
    return(
      <BrowserRouter>
        <Routes>
            {
              routesPaths.map(({path, type, routes}) => {


                return routes.map(([itemPath, element]) => (
                  <Route path={path + itemPath} element={element}/>
                ))

              })
            }
        </Routes>
      </BrowserRouter>
    );
};

export default Router