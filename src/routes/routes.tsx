import { Navigate } from "react-router-dom";

import ResetPassword from "../pages/resetPassword";
import AccountBlocked from "../pages/accountBlocked";
import Dashboard from "../pages/dashboard";
import EditUser from "../pages/editUser";
import Request from "../pages/requests";
import Profile from "../pages/profile";
import Logout from "../pages/logout";
import SignIn from "../pages/signIn";
import SignUp from "../pages/signUp";
import Error from "../pages/error";
import Users from "../pages/users";

const InitialRoute = () => localStorage.getItem("token") != null ? <Navigate to="/dashboard" replace/> : <Navigate to="/signin" />;

const routes = [
    {
        path: "/dashboard",
        privateRoute: true,
        routes: [
            ["/profile", <Profile/>],
            ["/", <Dashboard/>],
        ]
    },
    {
        path: "/dashboard/admin",
        privateRoute: true,
        routes: [
            ["/edit-user/:userID", <EditUser/>],
            ["/requests", <Request/>],
            ["/users", <Users/>],
        ]
    },
    {
        path: "/",
        privateRoute: false,
        routes: [
            ["/reset-password", <ResetPassword/>],
            ["*", <Navigate to="/404" replace/>],
            ['/account-blocked', <AccountBlocked />],
            ['/signin', <SignIn />],
            ['/signup', <SignUp />],
            ['', <InitialRoute />],
            ['/logout', <Logout />],
            ['/404', <Error />],
        ]
    },
];

export default routes;