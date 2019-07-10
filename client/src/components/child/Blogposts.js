import React from "react";
import config from "../../modules/config";
import axios from "axios";
import { withContext } from "../../context/WithContext";

class Blogposts extends React.Component {
  state = {
    text: ""
  };
  componentDidMount() {
    this.props.Context.setUsers();
  }

  deleteBlogHandler = item => {
    const AuthorizationHeader = config.AuthorizationHeader();
    axios
      .delete(`/api/deleteblog/${item._id}`, AuthorizationHeader)

      .then(response => {
        console.log(response);
        if (response.status == 200) {
          this.props.Context.setUser();
        }
      });
  };
  editPostHandler = item => {
    const selectedBlogPost = item;
    this.props.editBlog(item);
  };
  render() {
    const user = this.props.Context.user;
    const posts = this.props.Context.user.blog;
    return (
      <React.Fragment>
        {posts &&
          posts.map((item, i) => (
            <div key={i} className="stand container mx-auto border shadow-sm">
              <div className="d-flex flex-column">
                <div className="ml-3 mt-3">{item.blog_Date}</div>
                <div className="ml-3">{user.name}</div>
                <div className="border border-warning p-3 m-3">{item.text}</div>
              </div>
              <div className="d-flex flex-row-reverse m-3">
                <button
                  className="badge badge-danger m-1 p-2"
                  onClick={() => this.deleteBlogHandler(item)}
                >
                  Delete
                </button>

                <button
                  className="badge badge-warning m-1 p-2"
                  onClick={() => this.editPostHandler(item)}
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
      </React.Fragment>
    );
  }
}
export default withContext(Blogposts);
