import React, { Fragment } from "react"
import { Route, withRouter } from "react-router-dom"
import Register from "./auth/Register"
import Login from "./auth/Login"
import Newsfeed from "./newsfeed/Newsfeed"

const ApplicationViews = props => {
    return (
        <Fragment>
            <Route path="/register" render={props => (<Register {...props} />)} />
            <Route path="/login" render={props => (<Login {...props} />)} />
            <Route exact path="/" render={props => (<Newsfeed {...props} />)} />
        </Fragment>
    )
}

export default withRouter(ApplicationViews)