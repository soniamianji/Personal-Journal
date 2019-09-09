import React from "react";
import config from "../../../modules/config";
import axios from "axios";
import { withContext } from "../../../context/WithContext";
import SingleBlog from "./SingleBlog";

class Blogposts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      bool: ""
    };
  }

  componentDidMount() {
    this.props.Context.setUsers();
  }
  render() {
    const user = this.props.Context.user;
    const posts = this.props.Context.user.blog;
    return (
      <React.Fragment>
        <div className="mt-3">
          {posts && posts.map((item, i) => <SingleBlog key={i} item={item} />)}
        </div>
      </React.Fragment>
    );
  }
}
export default withContext(Blogposts);
