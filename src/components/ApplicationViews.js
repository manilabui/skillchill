import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Register from "./auth/Register";
import Login from "./auth/Login";
import Home from "./Home";
import PostForm from "./posts/PostForm";
import PostEditForm from "./posts/PostEditForm";
import SkillSearch from "./skills/SkillSearch";
import SkillForm from "./skills/SkillForm";

const ApplicationViews = props => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="avenir">
      <Route
        exact
        path="/"
        render={props =>
          isAuthenticated() ? <Home {...props} /> : <Redirect to="/login" />
        }
      />
      <Route path="/register" render={props => <Register {...props} />} />
      <Route path="/login" render={props => <Login {...props} />} />
      <Route path="/post/new" render={props => <PostForm {...props} />} />
      <Route
        path="/postpage/edit"
        render={props => <PostEditForm {...props} />}
      />
      <Route path="/skill/new" render={props => <SkillForm {...props} />} />
      <Route
        path="/search/skills"
        render={props => <SkillSearch {...props} />}
      />
    </div>
  );
};

export default withRouter(ApplicationViews);
