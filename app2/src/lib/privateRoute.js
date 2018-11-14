import React from "react"
import {Route, Redirect} from "react-router-dom"

// import Cookies from "universal-cookie"

// const cookie = new Cookies()
// const isLoggedIn = cookie.get("loggedIn")
// console.log(isLoggedIn, "typeof: ", typeof isLoggedIn);
import Cookies from "js-cookie";
const isLoggedIn = Cookies.get("loggedIn")
console.log(isLoggedIn, "typeof: ", typeof isLoggedIn);


const PrivateRoute = ({ component: Component, ...rest}) => (
    <Route {...rest} render={(props) => (
      isLoggedIn === true
      ? <Component {...props} />
      : <Redirect to='/login' />
    )}/>
)

export default PrivateRoute;