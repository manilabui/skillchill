import React, { useState, useEffect, useRef } from "react";
import { Link, withRouter } from "react-router-dom";
import { getAll, postItem } from "../../modules/apiManager";

import firebase from "../../modules/firebase";
import "firebase/storage";
import shortid from "shortid";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "filepond/dist/filepond.min.css";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const storage = firebase.storage().ref();

const PostForm = props => {
  const [currUserSkills, setUserSkills] = useState([]);
  const [currContentUrls, setIds] = useState([]);
  const [files, setFiles] = useState([]);
  const currPostSkill = useRef(null);
  const ref = useRef(null);

  const getCurrUserSkills = () => {
    getAll("userskills").then(skills => setUserSkills(skills));
  };

  useEffect(getCurrUserSkills, []);

  const skillOptions = currUserSkills.map(({ skill }) => {
    const { id, name } = skill;
    return (
      <option key={id} value={id}>
        {" "}
        {name}{" "}
      </option>
    );
  });

  const saveUrl = async url => {
    const newUrls = await currContentUrls.concat(url);
    setIds(newUrls);
  };

  const server = {
    // this uploads the image using firebase
    process: (fieldName, file, metadata, load, progress, error, abort) => {
      // create a unique id for the file
      const id = shortid.generate();

      // upload the image to firebase
      let task;
      if (file.type === "image/jpeg") {
        task = storage
          .child("images/" + id)
          .put(file, { contentType: "image/jpeg" });
      } else if (file.type === "video/mp4") {
        task = storage
          .child("videos/" + id)
          .put(file, { contentType: "video/mp4" });
      }

      task.on(
        "state_changed",
        snap => {
          switch (snap.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        err => error(err.message),
        () => {
          // Handle successful uploads on complete
          load(id);
          task.snapshot.ref.getDownloadURL().then(url => saveUrl(url));
        }
      );
    }
  };

  const handlePostCreation = e => {
    e.preventDefault();

    const postObj = {
      skill_id: currPostSkill.current.value,
      post_type: "P",
      is_public: true
    };

    postItem("posts", postObj).then(({ id, skill, post_type }) => {
      Promise.all(
        currContentUrls.map((url, i) => {
          const postPageObj = {
            post_id: id,
            content: url,
            page_num: i + 1,
            caption: ""
          };

          return postItem(`postpages`, postPageObj).then(r => r);
        })
      ).then(
        props.history.push({
          pathname: "/postpage/edit",
          state: { post_id: id, skill, post_type }
        })
      );
    });
  };

  const formInput = (
    <input
      className="b ph3 pv2 input-reset ba b--black bg-transparent grow f6 dib"
      type="submit"
      value="Next"
    />
  );

  return (
    <main className="pa4 black-80">
      <Link to="/">
        <div className="orange fr f4 fw3">x</div>
      </Link>
      <form className="measure center" onSubmit={handlePostCreation}>
        <fieldset className="ba b--transparent ph0 mh0">
          <legend className="f4 fw6 ph0 mh0">Create Post </legend>
          <div className="pv3">
            <label className="dib pr2 fw6 lh-copy f6" htmlFor="skills">
              Choose your skill:
            </label>
            <select
              required
              autoFocus
              className="bg-transparent"
              id="skills"
              ref={currPostSkill}
            >
              <option value=""> -- </option>
              {skillOptions}
            </select>
          </div>
          <FilePond
            required
            ref={ref}
            files={files}
            server={server}
            maxFiles={5}
            labelIdle='<span class="filepond--label-action"> Browse </span>'
            instantUpload={false}
            allowMultiple={true}
            allowDrop={false}
            allowReorder={true}
            onupdatefiles={fileItems => {
              setFiles(fileItems.map(fileItem => fileItem.file));
            }}
          />
        </fieldset>
        {formInput}
      </form>
    </main>
  );
};

export default withRouter(PostForm);
