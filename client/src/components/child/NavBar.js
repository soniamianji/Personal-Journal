import React from "react";
import config from "../../modules/config";
import axios from "axios";
import { withContext } from "../../context/WithContext";
import { Link } from "react-router-dom";
import Auth from "../../modules/Auth";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.props.Context.checkAuthentication();
  }

  componentDidMount() {
    if (Auth.isUserAuthenticated) {
      this.props.Context.setUser();
    }
  }

  render() {
    const authenticated = this.props.Context.isUserAuthenticated;
    const user = this.props.Context.user;
    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-md navbar-dark  bg-dark">
          <div className="d-flex">
            <ul className="navbar-nav mr-auto">
              {
                <li className="nav-item text-light">
                  <Link className=" text-light p-2 bd-highlight" to="/journal">
                    Journal
                  </Link>
                </li>
              }
              {authenticated && (
                <li className="nav-item text-light">
                  <Link className=" text-light p-2 bd-highlight" to="/">
                    Home
                  </Link>
                </li>
              )}

              {authenticated && (
                <li className="nav-item text-light">
                  <Link className=" text-light p-2 bd-highlight" to="/account">
                    Profile
                  </Link>
                </li>
              )}

              {!authenticated && (
                <li className="nav-item text-light">
                  <Link className=" text-light p-2 bd-highlight" to="/signup">
                    Sign up
                  </Link>
                </li>
              )}
              {!authenticated && (
                <li className="nav-item text-light ${isActiveClasses">
                  <Link className=" text-light p-2 bd-highlight" to="/login">
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>

          <div className="d-flex ml-auto">
            <ul className="navbar-nav ">
              {authenticated && (
                <li>
                  <a href="#" className="text-warning">
                    {user.name}
                  </a>
                </li>
              )}
              {authenticated && (
                <li className="nav-item text-light">
                  <Link
                    className=" text-light p-2 bd-highlight"
                    to="/logout"
                    // onClick={() => this.checkAuthentoation()}
                  >
                    Log out
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}
export default withContext(NavBar);
