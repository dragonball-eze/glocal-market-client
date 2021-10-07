import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { LoggedUserConsumer } from "../context/loggedUser";
import { toast } from "react-toastify";

function PrivateRoute({ component, ...options }) {
  const loggedInUser = useContext(LoggedUserConsumer);
  return loggedInUser ? (
    <Route {...options} component={component} />
  ) : (
    <Redirect to="/login" />
  );
  /* toast.success("Please log in.");
  history.push("/"); */
}

export default PrivateRoute;