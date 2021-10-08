import { Switch, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar2 from "./components/NavBar2";
import Signup from "./components/Signup";
import Login from "./components/Login";
import AddBook from "./components/AddBook";
import ListBooks from "./components/ListBooks";
import BookDetails from "./components/BookDetails";
import EditBook from "./components/EditBook";
import ListClothes from "./components/ListClothes";
import AddGarment from "./components/AddGarment";
import GarmentDetails from "./components/GarmentDetails";
import EditGarment from "./components/EditGarment";
import { LoggedUserProvider } from "./context/loggedUser";
import Home from "./components/Home";
import About from "./components/About";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";
import EditPicture from "./components/EditPicture";

function App() {
  const [loggedInUser, setCurrentLoggedInUser] = useState("");
  console.log("sgaethsthsth", loggedInUser);
  useEffect(() => {
    async function checkLoggedIn() {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_HOSTNAME}/isloggedin`,
        { withCredentials: true }
      );
      if (response.data.username) {
        setCurrentLoggedInUser(response.data);
      }
    }
    checkLoggedIn();
  }, []);

  return (
    <div className="App">
      <ToastContainer />
      <LoggedUserProvider value={loggedInUser}>
        <NavBar2
          loggedInUser={loggedInUser}
          setCurrentLoggedInUser={setCurrentLoggedInUser}
        />
        <Switch>
          <Route path="/signup" component={Signup} />
          <Route
            path="/Login"
            render={() => {
              return <Login setCurrentLoggedInUser={setCurrentLoggedInUser} />;
            }}
          />
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/books" component={ListBooks} />
          <Route exact path="/books/add" component={AddBook} />
          <Route exact path="/books/:id" component={BookDetails} />
          <Route exact path="/books/:id/edit" component={EditBook} />
          <Route exact path="/clothes" component={ListClothes} />
          <Route exact path="/clothes/add" component={AddGarment} />
          <Route exact path="/clothes/:id" component={GarmentDetails} />
          <Route
            exact
            path="/clothes/:id/edit"
            component={EditGarment}
          />
          <Route exact path="/profile/:id" component={Profile} />{" "}
          {/* check if non logged user can check profiles */}
          <Route
            exact
            path="/profile/:id/edit"
            component={EditProfile}
          />
          <Route
            exact
            path="/profile/:id/image"
            component={EditPicture}
          />
        </Switch>
      </LoggedUserProvider>
    </div>
  );
}

export default App;
