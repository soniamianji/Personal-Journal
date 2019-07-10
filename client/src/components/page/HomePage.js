import React from "react";
import config from "../../modules/config";
import axios from "axios";
import { withContext } from "../../context/WithContext";
import Blogposts from "../child/Blogposts";
class HomePage extends React.Component {
  state = {
    text: "",
    date: "",
    errors: {},
    posted: false,
    blogId: ""
  };
  componentDidMount() {
    this.props.Context.setUsers();
  }

  onSubmitHandler = e => {
    e.preventDefault();
    const AuthorizationHeader = config.AuthorizationHeader();
    if (!this.state.enableEdit) {
      const body = {
        text: this.state.text,
        date: this.state.date,
        id: this.props.Context.user._id,
        enableEdit: false
      };
      axios.put("/api/blogPost", body, AuthorizationHeader).then(response => {
        console.log(response.data);
        if (response.data.message === "success!") {
          this.setState({
            posted: true,
            text: ""
          });
          this.props.Context.setUser();
        }

        this.setState({
          errors: {}
        });
        localStorage.setItem("successMessage", response.data.message);
      });
      this.setState({
        text: ""
      });
    } else {
      console.log("edit post");
      const body = {
        text: this.state.text,
        date: this.state.date,
        blogId: this.state.blogId
      };
      axios
        .put("/api/editeblogpost", body, AuthorizationHeader)
        .then(response => {
          console.log(response);
          this.props.Context.setUser();
          this.setState({
            text: ""
          });

          // const { user } = response.data;
          // this.setState({ user, emailFormHidden: !this.state.emailFormHidden });
          // this.props.emailInputTrigger(
          //   this.state.emailFormHidden,
          //   this.state.user
          // );
        });
    }
  };
  onchangeHandler = e => {
    this.setState({
      posted: false
    });
    const d = Date(Date.now()).toString();
    this.setState({
      text: e.target.value,
      date: d
    });
  };

  editPostHandler = item => {
    console.log(item.text);
    this.setState({
      enableEdit: true,
      text: item.text,
      blogId: item._id
    });
  };

  render() {
    const user = this.props.Context.user;
    const posts = this.props.Context.user.blog;
    const { posted } = this.state;

    return (
      <React.Fragment>
        <h1 className="text-center">Hey {user && user.name}</h1>
        <div className="stand container mx-auto border shadow-sm">
          <form onSubmit={this.onSubmitHandler} className="form-signin">
            <div className="col w-50 mx-auto">
              <h6>{Date(Date.now()).toString()}</h6>
            </div>
            {this.state.enableEdit ? (
              <textarea
                type="text"
                rows="3"
                className="form-control w-50 mb-2 mx-auto"
                value={this.state.text}
                onChange={this.onchangeHandler}
              />
            ) : (
              <textarea
                type="text"
                rows="3"
                className="form-control w-50 mb-2 mx-auto"
                onChange={this.onchangeHandler}
                placeholder="Write your wisdom here!"
              />
            )}
            {posted && <h6 className="text-center text-info">Posted</h6>}
            <button
              type="submit"
              className="btn btn-lg btn-dark btn-block w-25 mb-2 mx-auto"
            >
              {this.state.enableEdit ? "Edit Post" : "Post"}
            </button>
          </form>
        </div>
        <Blogposts editBlog={this.editPostHandler} />
      </React.Fragment>
    );
  }
}
export default withContext(HomePage);
