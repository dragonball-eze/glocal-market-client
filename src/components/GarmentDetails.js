import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useHistory, NavLink } from "react-router-dom";
import { LoggedUserConsumer } from "../context/loggedUser";
import LinkButton from "./LinkButton";

function GarmentDetails({ match }) {
  const [garment, setGarment] = useState({});
  const history = useHistory();
  const [user, setUser] = useState({});
  const [buttonText, setButtonText] = useState();
  const loggedInUser = useContext(LoggedUserConsumer);

  useEffect(() => {
    async function getGarmentDetails() {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_HOSTNAME}/clothes/${match.params.id}`
      );
      setGarment(response.data);
      setButtonText(`Contact ${response.data.user.username}`)
      setUser(response.data.user);
    }
    getGarmentDetails();
  }, []);

  const handleDeleteProject = async (id) => {
    await axios.delete(
      `${process.env.REACT_APP_SERVER_HOSTNAME}/clothes/${id}`
    );
    history.push("/clothes");
  };

  return (
    <>
      <h2>Brand: {garment.brand}</h2>
      <h3>Size: {garment.size}</h3>
      <h3>Type: {garment.type}</h3>
      <h3>Level of Usage: {garment.usage}</h3>
      {user && <h4>Offered by: {user.username}</h4>}

      {garment.imageUrl && <img src={garment.imageUrl} alt="garment" />}

      {user.username === loggedInUser.username ? (
        <>
          <NavLink to={`/clothes/${garment._id}/edit`}>Edit</NavLink>
          <button onClick={() => handleDeleteProject(garment._id)}>
            Delete
          </button>
        </>
      ) : (
        <>
          <LinkButton
            to={`/profile/${user._id}`}
            onClick={(event) => {
              console.log("custom event here!", event);
            }}
          >
            User Profile
          </LinkButton>
          {user.username === loggedInUser && (
          <button onClick={() => setButtonText(`${user.email} or ${user.phone}`)}> {buttonText}</button>
          )}
          {/* <LinkButton
              to={`/profile/${user._id}`}
              onClick={(event) => {
                console.log('custom event here!', event)
              }}
            >Add to Favorites</LinkButton> */}
        </>
      )}
    </>
  );
}

export default GarmentDetails;
