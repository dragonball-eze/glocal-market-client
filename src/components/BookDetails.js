import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import { LoggedUserConsumer } from "../context/loggedUser";
import LinkButton from "./LinkButton";

function BookDetails({ match }) {
  const [book, setBook] = useState({});
  const history = useHistory();
  const [user, setUser] = useState({});
  const [buttonText, setButtonText] = useState("");
  const loggedInUser = useContext(LoggedUserConsumer);

  useEffect(() => {
    async function getBookDetails() {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_HOSTNAME}/books/${match.params.id}`
      );
      setBook(response.data);
      setUser(response.data.user);
      setButtonText(`Contact ${response.data.user.username}`);
    }
    getBookDetails();
  }, []);

  const handleDeleteProject = async (id) => {
    await axios.delete(`${process.env.REACT_APP_SERVER_HOSTNAME}/books/${id}`);
    history.push("/books");
  };

  return (
    <>
      <h2>Author: {book.author}</h2>
      <h3>Title: {book.title}</h3>
      <h3>Genre: {book.genre}</h3>
      <h3>Language: {book.language}</h3>
      {user && <h4>Offered by: {user.username}</h4>}

      <p>Review: {book.review}</p>
      {book.imageUrl && <img src={book.imageUrl} alt="book" />}

      {user.username === loggedInUser.username ? (
        <>
          <Link to={`/books/${book._id}/edit`}>
            <button type="button">Edit</button>
          </Link>
          <button type="button" onClick={() => handleDeleteProject(book._id)}>
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
            <button
              onClick={() => setButtonText(`${user.email} or ${user.phone}`)}
            >
              {buttonText}
            </button>
          )}
        </>
      )}
    </>
  );
}

export default BookDetails;