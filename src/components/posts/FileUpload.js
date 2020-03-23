import firebase from "firebase/app"
import "firebase/storage"
import shortid from 'shortid'
import { FilePond, registerPlugin } from "react-filepond"
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size"
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation"
import FilePondPluginImagePreview from "filepond-plugin-image-preview"
import FilePondPluginImageEdit from "filepond-plugin-image-edit"
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "filepond/dist/filepond.min.css"

registerPlugin(
  FilePondPluginFileValidateSize,
  FilePondPluginImageExifOrientation, 
  FilePondPluginImagePreview,
  FilePondPluginImageEdit
);

const storage = firebase.storage().ref();