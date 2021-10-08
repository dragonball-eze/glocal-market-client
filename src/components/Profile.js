import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { NavLink, Link } from "react-router-dom";
import { LoggedUserConsumer } from "../context/loggedUser";
import { Container, Row, Col, Image, Button } from "react-bootstrap";

function Profile({ match }) {
  const [user, setUser] = useState({});
  const [buttonText, setButtonText] = useState("");
  const loggedInUser = useContext(LoggedUserConsumer);

  useEffect(() => {
    async function getProfile() {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_HOSTNAME}/profile/${match.params.id}`
      );
      setButtonText(`Contact owner`);
      setUser(response.data);
    }
    getProfile();
  }, []);

  return (
    <>
      {user.username === loggedInUser.username ? (
        <div>
          <Container>
              <Row>
                <Col xs={6} md={4}></Col>
                <Col xs={6} md={4}>
                  <Image
                    src={user.imageUrl}
                    roundedCircle
                    style={{ width: 171, height: 180 }}
                  />
                </Col>
                <Col xs={6} md={4}></Col>
              </Row>
              <Row>
                <h2>{user.username}</h2>
                <p>{user.description}</p>
                <br />
              </Row>
              <Row>
                <Col>
                  <h4>My Library</h4>
                  {user.library && (
                    <ul>
                      {user.library.map((book) => {
                        return (
                          <div key={book.id}>
                            <NavLink to={`/books/${book._id}`}>
                              {book.title} by {book.author} in {book.language}
                            </NavLink>
                          </div>
                        );
                      })}
                    </ul>
                  )}
                  <br />
                  <Link to="/books/add">
                    <Button variant="outline-dark" type="button"> Add A Book to Library</Button>
                   </Link>
                </Col>
                <Col>
                  <h4>My wardrobe</h4>
                  {user.wardrobe && (
                    <ul>
                      {user.wardrobe.map((garment) => {
                        return (
                          <div key={garment.id}>
                            <NavLink to={`/clothes/${garment._id}`}>
                              {" "}
                              {garment.brand} {garment.type}
                            </NavLink>
                          </div>
                        );
                      })}
                    </ul>
                  )}
                  <br/>
                  <Link to="/clothes/add">
                    <Button variant="outline-dark" type="button"> Add A Garment to Wardrobe</Button>
                  </Link>
                </Col>
              </Row>
              <br />
            <Row>
              <Col>
                <Link to={`/profile/${user._id}/edit`}>
                  <Button variant="outline-dark" type="button">Edit Profile</Button>
                </Link>
              </Col>
              
              <Col>
                <Link to={`/profile/${user._id}/image`}>
                  <Button variant="outline-dark"type="button">Edit Picture</Button>
                </Link>
              </Col>
            </Row>
          </Container>
        </div>
      ) : (
        <>
        <Container>
            <Row>
              <Col xs={6} md={4}></Col>
              <Col xs={6} md={4}>
                <Image
                  src={user.imageUrl}
                  roundedCircle
                  style={{ width: 171, height: 180 }}
                />
              </Col>
              <Col xs={6} md={4}></Col>
            </Row>
            <Row>
              {user && <h1>{user.username} profile</h1>}
              <br />
              <br/>
              <h3>{user.description}</h3>
              <br/>
            </Row>
            <br/>
            <Row>
              <Col>
                <h4>{user.username}'s library</h4>
                {user.library && (
                  <ul>
                    {user.library.map((book) => {
                      return (
                        <div key={book.id}>
                          <NavLink to={`/books/${book._id}`}>
                            {book.title} by {book.author} in {book.language}
                          </NavLink>
                        </div>
                      );
                    })}
                  </ul>
                )}
              </Col>
              <br />
              <Col>
                  <h4>{user.username}'s wardrobe</h4>
                  {user.wardrobe && (
                    <ul>
                      {user.wardrobe.map((garment) => {
                        return (
                          <div key={garment.id}>
                            <NavLink to={`/clothes/${garment._id}`}>
                              {" "}
                              {garment.brand} {garment.type}
                            </NavLink>
                          </div>
                        );
                      })}
                    </ul>
                  )}
              </Col>
            </Row>
            <br/>
            <Row>
              <Col>
                <h5>
                  {user.username}'s preferred way of communication is by{" "}
                  {user.contact}
                </h5>
              </Col>
              <Col>
                <Button variant="outline-dark"
                  onClick={() => setButtonText(`${user.email} or ${user.phone}`)}
                >
                  {" "}
                  {buttonText}
                </Button>
              </Col>
            </Row>
        </Container>
        </>
      )}
    </>
  );
}

export default Profile;
