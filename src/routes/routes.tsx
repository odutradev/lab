import { Navigate } from "react-router-dom";

import AccountPending from "../pages/accountPending";
import AccountBlocked from "../pages/accountBlocked";
import ResetPassword from "../pages/resetPassword";
import InviteSpace from "../pages/inviteSpace";
import Dashboard from "../pages/dashboard";
import EditSpace from "../pages/editSpace";
import EditUser from "../pages/editUser";
import Request from "../pages/requests";
import Profile from "../pages/profile";
import Logout from "../pages/logout";
import SignIn from "../pages/signIn";
import SignUp from "../pages/signUp";
import Spaces from "../pages/spaces";
import Tasks from "../pages/tasks";
import Error from "../pages/error";
import Users from "../pages/users";

const InitialRoute = () => localStorage.getItem("token") != null ? <Navigate to="/dashboard" replace/> : <Navigate to="/signin" />;

const routes = [
    {
        path: "/dashboard",
        privateRoute: true,
        routes: [
            ["/invite-space/:spaceID", <InviteSpace/>],
            ["/edit-space/:spaceID", <EditSpace/>],
            ["/profile", <Profile/>],
            ["/spaces", <Spaces/>],
            ["/tasks", <Tasks/>],
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
            ['/account-blocked', <AccountBlocked />],
            ['/account-pending', <AccountPending />],
            ["/reset-password", <ResetPassword/>],
            ["*", <Navigate to="/404" replace/>],
            ['/signin', <SignIn />],
            ['/signup', <SignUp />],
            ['', <InitialRoute />],
            ['/logout', <Logout />],
            ['/404', <Error />],
        ]
    },
];

export default routes;