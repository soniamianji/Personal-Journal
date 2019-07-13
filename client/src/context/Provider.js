import { Context } from "./Context";
import * as React from "react";
import axios from "axios";
import config from "../modules/config";
import Auth from "../modules/Auth";

export default class Provider extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {},
      users: [],
      setUser: this.setUser.bind(this),
      setUsers: this.setUsers.bind(this),
      setAuthentication: this.setAuthentication.bind(this),
      checkAuthentication: this.checkAuthentication.bind(this),
      isUserAuthenticated: false
    };
  }
  setUser() {
    const AuthorizationHeader = config.AuthorizationHeader();
    axios.get("/api/getuser", AuthorizationHeader).then(response => {
      let { user } = response.data;
      let blog = user.blog;

      blog = blog.sort(function(a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.blog_Date) - new Date(a.blog_Date);
      });
      user.blog = blog;
      this.setState({
        user
      });
    });
  }
  setUsers() {
    const AuthorizationHeader = config.AuthorizationHeader();
    axios.get("/api/getallusers", AuthorizationHeader).then(response => {
      const { users } = response.data;
      this.setState({
        users
      });
    });
  }

  setAuthentication(bool) {
    this.setState({
      isUserAuthenticated: bool
    });
  }
  checkAuthentication() {
    this.setState({
      isUserAuthenticated: Auth.isUserAuthenticated()
    });
  }

  render() {
    return (
      <Context.Provider
        value={{
          Context: {
            ...this.state
          }
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}
