import React from "react";
import config from "../../modules/config";
import axios from "axios";
import { withContext } from "../../context/WithContext";
import Blogposts from "../child/Blogposts";
import Moment from "moment";
import JournalPost from "./JournalPost";

class Journal extends React.Component {
  state = {
    userBlog: []
  };
  componentDidMount() {
    let UnAthorizedHeader = config.UnAthorizedHeader();
    axios.get("/auth/getallblogs", UnAthorizedHeader).then(response => {
      let { users } = response.data;
      console.log(users);
      this.setState({
        users
      });
      const blogs = users.map((user, i) => {
        this.setState({
          userBlog: [...this.state.userBlog, ...user.blog]
        });
      });
    });
  }

  render() {
    const blogs = this.state.userBlog;
    const users = this.state.users;
    return (
      <React.Fragment>
        <h1 className="text-center"> Welcome to Monkey's Journal</h1>

        {users &&
          users.map((user, i) => {
            if (user.blog.length > 0) {
              return <JournalPost key={i} user={user} />;
            }
          })}
      </React.Fragment>
    );
  }
}
export default withContext(Journal);

//mp through the users array
//if the users blog is not empty
// return this
