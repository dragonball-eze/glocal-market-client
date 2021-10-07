import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

function EditPicture({match}) {
    const [imageUrl, setImageUrl] = useState("");

    const history = useHistory();

    useEffect(() => {
        async function getImage() {
          const user = await axios.get(
            `${process.env.REACT_APP_SERVER_HOSTNAME}/profile/${match.params.id}/image`
          );
    
          setImageUrl(user.data.imageUrl);
          }
          getImage();
      }, []);

      const handleFormSubmit = async (e) => {
        e.preventDefault();

      const uploadData = new FormData();
      uploadData.append("file", imageUrl);

      const response = await axios.post(
      `${process.env.REACT_APP_SERVER_HOSTNAME}/upload`,
      uploadData
    );

        const body = {
          imageUrl: response.data.fileUrl,
        };

        await axios.put(
            `${process.env.REACT_APP_SERVER_HOSTNAME}/profile/${match.params.id}/image`,
            body
          );
      
          toast.success("Picture updated");
          history.push("/");
        };


    return (
        <>
      <h2>Edit My Picture</h2>
      <form onSubmit={handleFormSubmit}>
        <label>Image: </label>
        <input type="file" onChange={(e) => setImageUrl(e.target.files[0])} />

        <button type="submit">Update</button>
      </form>
    </>
  );
    
}

export default EditPicture