import React, { useRef } from 'react'
import { Link, Redirect } from "react-router-dom"
import useAuth from '../../hooks/useAuth'

export default props => {
  const { login } = useAuth()
  const username = useRef()
  const password = useRef()

  const handleLogin = e => {
    const userInfo = {
      username: username.current.value,
      password: password.current.value,
    }

    console.log(username)
    login(userInfo)
    	.then(() => <Redirect to="/" />)
  }

  return (
        <main className='pa4 black-80'>
            <form className="measure center" onSubmit={handleLogin}>
                <fieldset className="ba b--transparent ph0 mh0">
                    <legend className="f4 fw6 ph0 mh0">Sign In</legend>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="username">
                          Username
                        </label>
                        <input
                          className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                          type="text"
                          required
                          ref={username}
                          id="username"
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
                </fieldset>
                <input
                  className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                  type="submit"
                  value="Sign In"
                />
                <Link to="/register" className="lh-copy mt3 f6 link dim black db">
                    Don't have an account?
                </Link>
            </form>
        </main>
    )
}