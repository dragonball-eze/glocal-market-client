import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { NavLink, Link } from "react-router-dom";
import { LoggedUserConsumer } from "../context/loggedUser";
import { Card, Button } from 'react-bootstrap';

function Profile({ match }) {
  const [user, setUser] = useState({});
  const [books, setBooks] = useState([]);
  const [buttonText, setButtonText] = useState("");
  const loggedInUser = useContext(LoggedUserConsumer);

  useEffect(() => {
    async function getProfile() {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_HOSTNAME}/profile/${match.params.id}`
      );
      setButtonText(`Contact owner`);
      setUser(response.data);
      setBooks(response.data);
    }
    getProfile();
  }, []);

  return (
    <>
      {user.username === loggedInUser.username ? (
        <div>
          <h1>{user.username}</h1>
          <br />
          <img src={user.imageUrl} alt="user profile"/>
          <h3>{user.description}</h3>
          <h4>My Library</h4>
          {user.library && 
            <div>
                {books.map((book) => {
                    return <div key={book.id}>
                    {/* {book.imageUrl && <img src={book.imageUrl} alt="book cover"/>}
                    <NavLink to={`/books/${book._id}`}>{book.title}</NavLink>
                    {user && <h4>Offered by: {user.username}</h4>} */}

                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={book.imageUrl} alt="book cover" />
                        <Card.Body>
                        <Card.Title>{book.title}</Card.Title>
                        <Card.Text>
                            <b>Review:</b> {book.review}
                        </Card.Text>
                        <Button variant="primary" href={`/books/${book._id}`}>More Details</Button>
                        </Card.Body>
                    </Card>
              </div>
          })}
      </div>
          }
          <Link to="/books/add">
            <button type="button"> Add A Book to Library</button>
          </Link>
          <br />
          <h4>My wardrobe</h4>
          { user.wardrobe &&
          <ul>
            {user.wardrobe.map((garment) => {
              return (
                <li key={garment.id}>
                  <NavLink to={`/clothes/${garment._id}`}> {garment.brand} {garment.type}</NavLink>
                </li>
              );
            })}
          </ul>
          }
          <Link to="/clothes/add">
            <button type="button"> Add A Garment to Wardrobe</button>
          </Link>

            <br/>
            <br/>
            <Link to={`/profile/${user._id}/edit`}>
              <button type="button">Edit Profile</button>
            </Link>
            <br/>
            <br/>
            <Link to={`/profile/${user._id}/image`}>
              <button type="button">Edit Picture</button>
            </Link>
          </div>
        ) : (
          <>
          {user && <h1>{user.username} profile</h1>}
          <br />
          <img src={user.imageUrl} alt="user profile"/>
          <h3>{user.description}</h3>
          <h4>{user.username}'s library</h4>
          {user.library && 
          <ul>
             {user.library.map((book) => {
              return (
                <li key={book.id}>
                <NavLink to={`/books/${book._id}`}>{book.title} by {book.author} in {book.language}</NavLink>
                </li>
              );
            })} 
          </ul>
          }
          <br />
          <h4>{user.username}'s wardrobe</h4>
          { user.wardrobe &&
          <ul>
            {user.wardrobe.map((garment) => {
              return (
                <li key={garment.id}>
                  <NavLink to={`/clothes/${garment._id}`}> {garment.brand} {garment.type}</NavLink>
                </li>
              );
            })}
          </ul>
          }
            <h5>{user.username}'s preferred way of communication is by {user.contact}</h5>
            <button onClick={() => setButtonText(`${user.email} or ${user.phone}`)}> {buttonText}</button>
          </>
        )}
     
    </>
  );
}

export default Profile;