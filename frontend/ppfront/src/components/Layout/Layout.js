import React from "react";
import {
  Route,
  Switch,
  Redirect,
  withRouter,
} from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// components
import Header from "../Header";
import Sidebar from "../Sidebar";

// pages
import Dashboard from "../../pages/dashboard";
import Typography from "../../pages/typography/Typography";
import Notifications from "../../pages/notifications";
import FileUploads from "../../pages/fileupload/FileUploads";
// context
import { useLayoutState } from "../../context/LayoutContext";


function Layout(props) {
  const onFileChange = (files) => {
    console.log(files);
}
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();

  return (
    <div className={classes.root}>
        <>
          <Header history={props.history} />
          <Sidebar />
          <div
            className={classnames(classes.content, {
              [classes.contentShift]: layoutState.isSidebarOpened,
            })}
          >
            <div className={classes.fakeToolbar} />
            <Switch>
              <Route path="/app/dashboard" component={Dashboard} />
              <Route path="/app/fileupload" component={() => <FileUploads  onFileChange={(files) => onFileChange(files)} />}  />
              <Route path="/app/notifications" component={Notifications} />
            </Switch>
          </div>
        </>
    </div>
  );
}

export default withRouter(Layout);
