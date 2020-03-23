// code from https://benmcmahen.com/uploading-images-with-firebase-and-react/

import React, { useState, useRef } from "react"
import firebase from "firebase/app"
import "firebase/storage"
import shortid from 'shortid'
import { FilePond, registerPlugin } from "react-filepond"
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size"
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation"
import FilePondPluginImagePreview from "filepond-plugin-image-preview"
import FilePondPluginImageEdit from "filepond-plugin-image-edit"
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css"
import "filepond/dist/filepond.min.css"

registerPlugin(
  FilePondPluginFileValidateSize,
  FilePondPluginImageExifOrientation, 
  FilePondPluginImagePreview,
  FilePondPluginImageEdit
)

const storage = firebase.storage().ref()

export const FileUpload = ({ onRequestSave, onRequestClear, defaultFiles=[] }) => {
	const [files, setFiles] = React.useState(defaultFiles)
  const ref = React.useRef(null)

  const server = {
  // this uploads the image using firebase
  	process: (fieldName, file, metadata, load, error, progress, abort) => {
	    // create a unique id for the file
	    const id = shortid.generate()

	    // upload the image to firebase
	    const task = storage.child('images/' + id).put(file, {
	      contentType: 'image/jpeg',
    })

    // monitor the task to provide updates to FilePond
    task.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      snap => {
        // provide progress updates
        progress(true, snap.bytesTransferred, snap.totalBytes)
      },
      err => {
        // provide errors
        error(err.message)
      },
      () => {
        // the file has been uploaded
        load(id)
        onRequestSave(id)
      }
    )
  },

  // this loads an already uploaded image to firebase
  load: (source, load, error, progress, abort) => {
    // reset our progress
    progress(true, 0, 1024)

    // fetch the download URL from firebase
    storage
      .child('images/' + source)
      .getDownloadURL()
      .then(url => {
        // fetch the actual image using the download URL
        // and provide the blob to FilePond using the load callback
        let xhr = new XMLHttpRequest()
        xhr.responseType = 'blob'
        xhr.onload = function(event) {
          let blob = xhr.response
          load(blob)
        }
        xhr.open('GET', url)
        xhr.send()
      })
      .catch(err => {
        error(err.message)
        abort()
      })
	  },
	}

	return (
    <FilePond
    	ref={ref}
      files={files}
      allowMultiple={true}
      maxFiles={10}
      onupdatefiles={fileItems => {
        if (fileItems.length === 0) {
          onRequestClear()
        }

        setFiles(fileItems.map(fileItem => fileItem.file))
      }}
      server={server}
    />
  )

}