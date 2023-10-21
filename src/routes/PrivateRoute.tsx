import React from "react";
import { useSelector } from "react-redux";
import { Route, Navigate, RouteProps } from "react-router-dom";

import { APICore } from "../helpers/api/apiCore";
import { RootState } from "../redux/store";

/**
 * Private Route forces the authorization before the route can be accessed
 * @param {*} param0
 * @returns
 */
const PrivateRoute = ({ component: Component, roles, ...rest }: any) => {
  const api = new APICore();


  const { userAuthenticate } = useSelector(
    (state: RootState) => ({
      userAuthenticate: state.Auth.user,
    })
  );

  console.log("==========>", userAuthenticate)
  return (
    <Route
      {...rest}
      render={(props: RouteProps) => {
        if (!userAuthenticate) {
          // not logged in so redirect to login page with the return url
          return (
            <Navigate
              // state={from: props['path']}
              to={{
                pathname: "/auth/login",
                // state: { from: props['path'] },
              }}
            />
          );
        }

        const loggedInUser = api.getLoggedInUser();

        // check if route is restricted by role
        if (roles && roles.indexOf(loggedInUser.role) === -1) {
          // role not authorised so redirect to login page
          return <Navigate to={{ pathname: "/" }} />;
        }
        // authorised so return component
        return <Component {...props} />;
      }}
    />
  );
};

export default PrivateRoute;
