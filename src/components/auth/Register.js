import React, { useRef } from "react";
import { Link, withRouter } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Register = props => {
  const { register } = useAuth();
  const userName = useRef();
  const email = useRef();
  const password = useRef();
  const verifyPassword = useRef();
  const firstName = useRef();
  const lastName = useRef();
  const avatar = useRef();

  const handleRegister = e => {
    e.preventDefault();

    const newUser = {
      username: userName.current.value,
      email: email.current.value,
      password: password.current.value,
      first_name: firstName.current.value,
      last_name: lastName.current.value,
      avatar: avatar.current.value
    };

    register(newUser).then(() => props.history.push({ pathname: "/" }));
  };

  return (
    <main className="pa4 black-80">
      <form className="measure center" onSubmit={handleRegister}>
        <fieldset className="ba b--transparent ph0 mh0">
          <legend className="f4 fw6 ph0 mh0">Register</legend>
          <div className="mt3">
            <label className="db fw6 lh-copy f6" htmlFor="firstName">
              First Name
            </label>
            <input
              className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
              type="text"
              required
              ref={firstName}
              id="firstName"
              autoFocus
              placeholder=""
            />
          </div>
          <div className="mv3">
            <label className="db fw6 lh-copy f6" htmlFor="lastName">
              Last Name
            </label>
            <input
              className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
              type="text"
              required
              ref={lastName}
              id="lastName"
              placeholder=""
            />
          </div>
          <div className="mv3">
            <label className="db fw6 lh-copy f6" htmlFor="username">
              Username
            </label>
            <input
              className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
              type="text"
              required
              ref={userName}
              id="username"
              placeholder=""
            />
          </div>
          <div className="mv3">
            <label className="db fw6 lh-copy f6" htmlFor="email">
              Email
            </label>
            <input
              className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
              type="email"
              required
              ref={email}
              id="email"
              placeholder=""
            />
          </div>
          <div className="mv3">
            <label className="db fw6 lh-copy f6" htmlFor="password">
              Password
            </label>
            <input
              className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
              type="password"
              required
              ref={password}
              id="password"
              placeholder=""
            />
          </div>
          <div className="mv3">
            <label className="db fw6 lh-copy f6" htmlFor="verifyPassword">
              Verify Password
            </label>
            <input
              className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
              type="password"
              required
              ref={verifyPassword}
              id="verifyPassword"
              placeholder=""
            />
          </div>
        </fieldset>
        <input
          className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
          type="submit"
          value="Sign Up"
        />
        <Link to="/login" className="lh-copy mt3 f6 link dim black db">
          Already have an account?
        </Link>
      </form>
    </main>
  );
};

export default withRouter(Register);
