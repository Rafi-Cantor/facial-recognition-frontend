import { useState } from 'react'
import { postUploadForRecognition } from '../apis';

function GetProfile() {
  const [image, setImage] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function uploadProfile(e) {
    e.preventDefault();
    setResponseMessage("");
    setIsLoading(true);
    console.log(image);
    postUploadForRecognition(image)
    .then((response) => {
      setIsLoading(false);
      if (response.face_matches && response.face_matches.length > 0) {
        setResponseMessage(response.face_matches[0].full_name);
        
      } else {
        setResponseMessage("No matching profile found.");
      }
    })
      .catch((error) => {
        setIsLoading(false);
        if (error.status === 400) {
          setResponseMessage(error.response.data.error_message);
        } else {
            console.log(error);
        }
      });
  }

  return (
    <>
      <h1>Get Profile</h1>
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

        <button type="submit">Submit</button>
      </form>
      {responseMessage && (<p>{responseMessage}</p>)}
      {isLoading && (<p>Finding match...</p>)}
    </>
  );

}

export default GetProfile
