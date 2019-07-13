import React from "react";
import Auth from "../../modules/Auth";
import { withContext } from "../../context/WithContext";

class Logout extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    // deauthenticate user
    Auth.deauthenticateUser();
    this.props.Context.setAuthentication(false);
    // change the current URL to / after logout
    this.props.history.push("/");
  }

  render() {
    return (
      <div>
        <p>Logging out...</p>
      </div>
    );
  }
}

export default withContext(Logout);
