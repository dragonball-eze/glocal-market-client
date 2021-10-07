import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

function EditProfile({match}) {
    const [description, setDescription] = useState("");
    const [contact, setContact] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const history = useHistory();

    useEffect(() => {
        async function getUser() {
          const user = await axios.get(
            `${process.env.REACT_APP_SERVER_HOSTNAME}/profile/${match.params.id}`
          );
    
          setDescription(user.data.description);
          setContact(user.data.contact);
          setEmail(user.data.email);
          setPhone(user.data.phone);
        }
        getUser();
      }, []);

      const handleFormSubmit = async (e) => {
        e.preventDefault();

        const body = {
          description,
          contact,
          email,
          phone,
        };

        await axios.put(
            `${process.env.REACT_APP_SERVER_HOSTNAME}/profile/${match.params.id}`,
            body
          );
      
          toast.success("Profile updated");
          history.push("/");
        };


    return (
        <>
      <h2>Edit My Profile</h2>
      <form onSubmit={handleFormSubmit}>
        <label>Description: </label>
        <input
          type="text"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />

        <label>Email: </label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <label>Phone Number: </label>
        <input
          type="text"
          onChange={(e) => setPhone(e.target.value)}
          value={phone}
        />

        <label>Preferred way of contact: </label>
        <select value={contact} onChange={(e) => setContact(e.target.value)}>
          <option value="0">Select favorite way</option>
          <option value="email">Email</option>
          <option value="phone call">Phone Call</option>
          <option value="text">Text Message</option>
          <option value="whatsapp">WhatsApp</option>
          <option value="videocall">Video Call</option>
        </select>

        <button type="submit">Update</button>
      </form>
    </>
  );
    
}

export default EditProfile