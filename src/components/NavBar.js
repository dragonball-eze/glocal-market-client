import React from "react";
import { NavLink } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar'
import axios from "axios";


function NavBar({ loggedInUser, setCurrentLoggedInUser }) {
  const logoutUser = async () => {
    await axios.post(`${process.env.REACT_APP_SERVER_HOSTNAME}/logout`, null, {
      withCredentials: true,
    });
    setCurrentLoggedInUser("");
  };

  return loggedInUser ? (
    <>
      <p>Welcome {loggedInUser.username}!</p>
      <nav>
        <ul>
          
          <li>
            <NavLink activeStyle={{ color: "red" }} exact to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink activeStyle={{ color: "red" }} exact to="/about">
              About
            </NavLink>
          </li>
          <li>
            <NavLink activeStyle={{ color: "red" }} exact to="/books">
              Books
            </NavLink>
          </li>
          <li>
            <NavLink activeStyle={{ color: "red" }} exact to="/clothes">
              Clothes
            </NavLink>
          </li>
         {/*  <li>
            <NavLink activeStyle={{ color: "red" }} to="/books/add">
              Add A Book
            </NavLink>
          </li>
          <li>
            <NavLink activeStyle={{ color: "red" }} to="/clothes/add">
              Add A Garment
            </NavLink>
          </li> */}
           <li>
            <NavLink activeStyle={{ color: "red" }} exact to={`/profile/${loggedInUser._id}`}>
              My Profile
            </NavLink>
          </li> 
          <li>
            <NavLink exact to="/">
              <button onClick={logoutUser}>Logout</button>
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  ) : (
    <nav>
      <ul>
         <li>
            <NavLink activeStyle={{ color: "red" }} exact to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink activeStyle={{ color: "red" }} exact to="/about">
              About
            </NavLink>
          </li>
          <li>
          <NavLink activeStyle={{ color: "red" }} exact to="/books">
            Books
          </NavLink>
        </li>
        <li>
          <NavLink activeStyle={{ color: "red" }} exact to="/clothes">
            Clothes
          </NavLink>
        </li>
        <li>
          <NavLink activeStyle={{ color: "red" }} to="/signup">
            Signup
          </NavLink>
        </li>
        <li>
          <NavLink activeStyle={{ color: "red" }} to="/login">
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;

