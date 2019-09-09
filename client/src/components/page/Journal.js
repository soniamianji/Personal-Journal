import React from "react";
import config from "../../modules/config";
import axios from "axios";
import { withContext } from "../../context/WithContext";
import Blogposts from "../child/userBlogs/Blogposts";
import Moment from "moment";
import JournalPost from "./JournalPost";

class Journal extends React.Component {
  state = {
    allBlogs: []
  };
  componentDidMount() {
    let UnAthorizedHeader = config.UnAthorizedHeader();
    axios.get("/auth/getallblogs", UnAthorizedHeader).then(response => {
      let { users } = response.data;
      this.setState({
        users
      });
      let allBlogs = [];
      users.map((user, i) => {
        let currentBlogs = [];
        user.blog.map((blog, j) => {
          let _blog = blog;
          _blog.userName = user.name;
          currentBlogs.push(_blog);
        });
        allBlogs.push(...currentBlogs);
      });

      allBlogs = allBlogs.sort((a, b) => (b.blog_Date > a.blog_Date ? 1 : -1));
      console.log(allBlogs);
      this.setState({
        allBlogs
      });
    });
  }

  render() {
    const allBlogs = this.state.allBlogs;
    // const users = this.state.users;
    return (
      <React.Fragment>
        <div className=" standParent mx-auto">
          <h1 className="text-center text-light">
            {" "}
            Welcome to Monkey's Journal
          </h1>
          <div className="mt-3">
            {allBlogs &&
              allBlogs.map((blog, i) => <JournalPost key={i} blog={blog} />)}
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default withContext(Journal);

//mp through the users array
//if the users blog is not empty
// return this
