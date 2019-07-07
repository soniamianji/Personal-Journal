import React from "react";
import config from "../../modules/config";
import axios from "axios";
import { withContext } from "../../context/WithContext";
import { Link } from "react-router-dom";
import Auth from "../../modules/Auth";

class NavBar extends React.Component {
  componentDidMount() {
    if(Auth.isUserAuthenticated){
      this.props.Context.setUser();
    }
  }

  render() {
    return (
      <React.Fragment>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/account">AccountPage</Link>
          </li>
          <li>
            <Link to="/signup">Sign up</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/logout">Log out</Link>
          </li>
        </ul>
      </React.Fragment>
    );
  }
}
export default withContext(NavBar);
