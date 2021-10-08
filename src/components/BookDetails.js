import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import { LoggedUserConsumer } from "../context/loggedUser";
import { Button, Container, Row, Col } from "react-bootstrap";

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
      <Container>
        <Row>
          <h1>Is it a Match?</h1>
        </Row>
        <Row>
          <Col>{book.imageUrl && <img src={book.imageUrl} className="images" alt="book" />}</Col>
          <Col>
            <h2>Author: {book.author}</h2>
            <h3>Title: {book.title}</h3>
            <h3>Genre: {book.genre}</h3>
            <h3>Language: {book.language}</h3>
            {user && <h4>Offered by: {user.username}</h4>}
            <p>Review: {book.review}</p>
          </Col>

          {user.username === loggedInUser.username ? (
            <>
              <Link to={`/books/${book._id}/edit`}>
                <Button variant="outline-dark" type="button">
                  Edit
                </Button>
              </Link>
              <Button
                variant="outline-dark"
                type="button"
                onClick={() => handleDeleteProject(book._id)}
              >
                Delete
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline-dark">
                <a
                  href={`/profile/${user._id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {" "}
                  User Profile{" "}
                </a>
              </Button>

              <Button
                variant="outline-dark"
                onClick={() => setButtonText(`${user.email} or ${user.phone}`)}
              >
                {buttonText}
              </Button>
            </>
          )}
        </Row>
      </Container>
    </>
  );
}

export default BookDetails;
