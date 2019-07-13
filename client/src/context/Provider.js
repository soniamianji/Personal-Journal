import { Context } from "./Context";
import * as React from "react";
import axios from "axios";
import config from "../modules/config";

export default class Provider extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {},
      users: [],
      setUser: this.setUser.bind(this),
      setUsers: this.setUsers.bind(this)
    };
  }
  setUser() {
    const AuthorizationHeader = config.AuthorizationHeader();
    axios.get("/api/getuser", AuthorizationHeader).then(response => {
      let { user } = response.data;
      let blog = user.blog;

      user.blog.sort(function(a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(a.blog_Date) - new Date(b.blog_Date);
      });
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
