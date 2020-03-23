import React from "react"
import { Route, withRouter } from "react-router-dom"
import Register from "./auth/Register"
import Login from "./auth/Login"
import Home from "./Home"
import PostCreateForm from "./posts/PostCreateForm"

const ApplicationViews = props => {

	// TODO: may add a search route (for skillage search page)

  return (
    <div className="avenir">
      <Route exact path="/" render={props => (<Home {...props} />)} />
      <Route path="/register" render={props => (<Register {...props} />)} />
      <Route path="/login" render={props => (<Login {...props} />)} />
      <Route path="/post/new" render={props => (<PostCreateForm {...props} />)} />
    </div>
  )
}

export default withRouter(ApplicationViews)