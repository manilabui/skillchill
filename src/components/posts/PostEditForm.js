import React, { useState, useRef } from "react"
import { Link, withRouter } from "react-router-dom"

import firebase from '../../modules/firebase';
import "firebase/storage"
import shortid from 'shortid'

const storage = firebase.storage().ref()

const PostEditForm = props => {
  const [image, setImage] = useState('')
  const caption = useRef()

  const handlePostPageCreation = e => {
    e.preventDefault()
    console.log('hello hi')
  }

  return (
    <main className='pa4 black-80'>
      <form className="measure center" onSubmit={handlePostPageCreation}>
        <fieldset className="ba b--transparent ph0 mh0">
          <legend className="f4 fw6 ph0 mh0">Create Post</legend>
          <div className="mt3">
            <label className="db fw6 lh-copy f6" htmlFor="caption">
              Caption
            </label>
            <input
              className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
              type="text"
              required
              ref={caption}
              id="caption"
              autoFocus
              placeholder=""
            />
          </div>
        </fieldset>
        <input
          className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
          type="submit"
          value="Share"
        />
      </form>
    </main>
  )
}

export default withRouter(PostEditForm)