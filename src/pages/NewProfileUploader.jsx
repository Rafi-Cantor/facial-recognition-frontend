import { useState } from "react";
import { putNewProfile } from "../apis";

function NewProfileUploader() {
  const [image, setImage] = useState(null);
  const [fullName, setFullName] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function uploadProfile(e) {
    e.preventDefault();
    setResponseMessage("");
    setIsLoading(true);
    putNewProfile(image, fullName)
      .then((response) => {
        setResponseMessage(response.message);
        
      })
      .catch((error) => {
        if (error.status === 400) {
          setResponseMessage(error.response.data.error_message);
        } else {
            console.log(error);
        }
      }).finally(() =>(setIsLoading(false)));
  }

  return (
    <>
      <h1>Upload New Profile</h1>
      {image && (
      <img
        src={URL.createObjectURL(image)}
        alt="Uploaded Preview"
        style={{ maxWidth: '300px', maxHeight: '300px', objectFit: 'contain' }} 
      />
    )}

      <form onSubmit={uploadProfile}>
        <label htmlFor="imageInput">Image:</label>
        <input
          id="imageInput"
          type="file"
          name="image"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />

        <label htmlFor="fullNameInput">Full Name:</label>
        <input
          id="fullNameInput"
          type="text"
          name="full_name"
          onChange={(e) => setFullName(e.target.value)}
          required
        />

        <button type="submit">Submit</button>
      </form>
      {responseMessage && (<p>{responseMessage}</p>)}
      {isLoading && (<p>Uploading profile...</p>)}
    </>
  );
}

export default NewProfileUploader;
