import React, { useState } from "react";
import { Button, CircularProgress, Fade, Grid, Tab, Tabs, TextField, Typography } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import classnames from "classnames";
// styles
import useStyles from "./styles";
// logo
import logo from "./logo.svg";
import google from "../../images/google.svg";
// context
import { loginUser, useUserDispatch } from "../../context/UserContext";
import { ReCaptcha } from "react-recaptcha-v3";
import { RECAPTCHA_SITE_KEY } from "../../components/App";
import Axios from "axios";

function Login(props) {
  var classes = useStyles();

  // global
  var userDispatch = useUserDispatch();

  // local
  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(null);
  var [activeTabId, setActiveTabId] = useState(0);
  var [nameValue, setNameValue] = useState("");
  var [loginValue, setLoginValue] = useState("");
  var [passwordValue, setPasswordValue] = useState("");
  var [recapToken, setRecapToken] = useState("");

  const loginClick=()=>{
    Axios.post("http://adminpanel.com/api/v1/login", {
      username : nameValue,
      password : passwordValue,
      recap : recapToken
    }).then(res=>{
    loginUser(
      userDispatch,
      loginValue,
      passwordValue,
      props.history,
      setIsLoading,
      setError,
    );
    }).catch(e=>{})
  }

  console.log("token", recapToken);
  return (
    <Grid container className={classes.container}>
      <ReCaptcha
        sitekey={RECAPTCHA_SITE_KEY}
        action='login'
        verifyCallback={token => setRecapToken(token)}
      />

      <div className={classes.formContainer}>
        <div className={classes.form}>
          <Tabs
            value={activeTabId}
            onChange={(e, id) => setActiveTabId(id)}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="ورود" classes={{ root: classes.tab }}/>
            <Tab label="عضویت" classes={{ root: classes.tab }}/>
          </Tabs>
          {activeTabId === 0 && (
            <React.Fragment>
              <Typography variant="h1" className={classes.greeting}>
              خوش امدید
              </Typography>
              <Button size="large" className={classes.googleButton}>
                <img src={google} alt="google" className={classes.googleIcon}/>
                &nbsp;ورود با استفاده از گوگل
              </Button>
              <div className={classes.formDividerContainer}>
                <div className={classes.formDivider}/>
                <Typography className={classes.formDividerWord}>یا</Typography>
                <div className={classes.formDivider}/>
              </div>
              <Fade in={error}>
                <Typography color="secondary" className={classes.errorMessage}>
                  مشکلی پیش اومده شرمنده
                </Typography>
              </Fade>
              <TextField
                id="email"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={loginValue}
                onChange={e => setLoginValue(e.target.value)}
                margin="normal"
                placeholder="ادرس ایمیل خود را وارد کنید"
                type="email"
                fullWidth
              />
              <TextField
                id="password"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={passwordValue}
                onChange={e => setPasswordValue(e.target.value)}
                margin="normal"
                placeholder="پسورد خود را وارد کنید"
                type="password"
                fullWidth
              />
              <div className={classes.formButtons}>
                {isLoading ? (
                  <CircularProgress size={26} className={classes.loginLoader}/>
                ) : (
                  <Button
                    disabled={
                      loginValue.length === 0 || passwordValue.length === 0
                    }
                    onClick={() => {
                      loginClick()
                    }
                    }
                    variant="contained"
                    color="primary"
                    size="large"
                  >
                    ورود
                  </Button>
                )}
                <Button
                  color="primary"
                  size="large"
                  className={classes.forgetButton}
                >
                  فراموشی رمز
                </Button>
              </div>
            </React.Fragment>
          )}
          {activeTabId === 1 && (
            <React.Fragment>
              <Typography variant="h1" className={classes.greeting}>
                خوش آمدید
              </Typography>
              <Typography variant="h2" className={classes.subGreeting}>
                حساب جدید بسازید
              </Typography>
              <Fade in={error}>
                <Typography color="secondary" className={classes.errorMessage}>
                  یوزر نیم یا پسورد شما اشتباه است :(
                </Typography>
              </Fade>
              <TextField
                id="name"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={nameValue}
                onChange={e => setNameValue(e.target.value)}
                margin="normal"
                placeholder="نام کامل خود را وارد کنید"
                type="text"
                fullWidth
              />
              <TextField
                id="email"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={loginValue}
                onChange={e => setLoginValue(e.target.value)}
                margin="normal"
                placeholder="ایمیل"
                type="email"
                fullWidth
              />
              <TextField
                id="password"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={passwordValue}
                onChange={e => setPasswordValue(e.target.value)}
                margin="normal"
                placeholder="پسورد"
                type="password"
                fullWidth
              />
              <div className={classes.creatingButtonContainer}>
                {isLoading ? (
                  <CircularProgress size={26}/>
                ) : (
                  <Button
                    onClick={() =>
                      loginUser(
                        userDispatch,
                        loginValue,
                        passwordValue,
                        props.history,
                        setIsLoading,
                        setError,
                      )
                    }
                    disabled={
                      loginValue.length === 0 ||
                      passwordValue.length === 0 ||
                      nameValue.length === 0
                    }
                    size="large"
                    variant="contained"
                    color="primary"
                    fullWidth
                    className={classes.createAccountButton}
                  >
                    ثبت نام
                  </Button>
                )}
              </div>
              <div className={classes.formDividerContainer}>
                <div className={classes.formDivider}/>
                <Typography className={classes.formDividerWord}>or</Typography>
                <div className={classes.formDivider}/>
              </div>
              <Button
                size="large"
                className={classnames(
                  classes.googleButton,
                  classes.googleButtonCreating,
                )}
              >
                <img src={google} alt="google" className={classes.googleIcon}/>
                &nbsp;ثبت نام با گوگل
              </Button>
            </React.Fragment>
          )}
        </div>
        <Typography color="primary" className={classes.copyright}>
        ©همه ی حقوق این سایت محفوظ می باشد
        </Typography>
      </div>
    </Grid>
  );
}

export default withRouter(Login);
