import axios from 'axios';

export const putNewProfile = async (file, fullName) => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('full_name', fullName);

    const { data } = await axios.put(`http://127.0.0.1:5000/upload_new_profile`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
    return data;
  };


export const postUploadForRecognition = async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    const { data } = await axios.post(`http://127.0.0.1:5000/upload_for_recognition`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
    return data;
  };

