import React, { useRef } from "react"
import { Link, withRouter } from "react-router-dom"
import firebase from "firebase/app";
import "firebase/storage";
import shortid from 'shortid'
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";

const storage = firebase.storage().ref();

const PostCreateForm = props => {
    const caption = useRef()

    // need a dropdown menu for the userskills
    // may need to upload the files, and then go create the post pages at the next step

    return (
        <main className='pa4 black-80'>
            <form className="measure center" onSubmit={handlePostCreation}>
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
                  value="Sign Up"
                />
                <Link to="/login" className="lh-copy mt3 f6 link dim black db">
                    Already have an account?
                </Link>
            </form>
        </main>
    )
}

export default withRouter(Register)