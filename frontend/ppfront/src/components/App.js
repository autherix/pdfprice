import React, { useEffect } from "react";
import { HashRouter, Redirect, Route, Switch } from "react-router-dom";
// components
import Layout from "./Layout";
// pages
import Error from "../pages/error";
import Login from "../pages/login";
// context
import { useUserState } from "../context/UserContext";
import About from "../pages/login/About";
import { loadReCaptcha } from "react-recaptcha-v3";

export const RECAPTCHA_SITE_KEY="6LfKKAEVAAAAAGQv8jCaT0MA7olm8fOOJw4Mqa6T";

export default function App() {
  // global
  var { isAuthenticated } = useUserState();

//   useEffect(()=>{
//     loadReCaptcha(RECAPTCHA_SITE_KEY);
//   },[]);

  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/app/dashboard"/>}/>
        <Route
          exact
          path="/app"
          render={() => <Redirect to="/app/dashboard"/>}
        />
        <PrivateRoute path="/app" component={Layout}/>
        <PublicRoute path="/login" component={Login}/>
        <PublicRoute path={"/about"} component={About}/>
        <Route component={Error}/>
      </Switch>
    </HashRouter>
  );

  // #######################################################################

  function PrivateRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            React.createElement(component, props)
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          )
        }
      />
    );
  }

  function PublicRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            <Redirect
              to={{
                pathname: "/",
              }}
            />
          ) : (
            React.createElement(component, props)
          )
        }
      />
    );
  }
}
