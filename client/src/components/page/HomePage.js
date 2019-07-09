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
    posted: false
  };
  componentDidMount() {
    this.props.Context.setUsers();
  }

  onSubmitHandler = e => {
    e.preventDefault();
    const AuthorizationHeader = config.AuthorizationHeader();
    const body = {
      text: this.state.text,
      date: this.state.date,
      id: this.props.Context.user._id
    };
    console.log(body.id);
    axios.put("/api/blogPost", body, AuthorizationHeader).then(response => {
      console.log(response.data);
      if (response.data.message === "success!") {
        this.setState({
          posted: true
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
  };
  onchangeHandler = e => {
    this.setState({
      posted: false
    });
    const d = Date(Date.now()).toString();
    console.log(d);
    this.setState({
      text: e.target.value,
      date: d
    });
  };

  render() {
    const user = this.props.Context.user;
    console.log(user.blog);
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
            <textarea
              type="text"
              rows="3"
              className="form-control w-50 mb-2 mx-auto"
              onChange={this.onchangeHandler}
              value={this.state.text}
              placeholder="Write your wisdom here!"
            />
            {posted && <h6 className="text-center text-info">Posted</h6>}
            <button
              type="submit"
              className="btn btn-lg btn-dark btn-block w-25 mb-2 mx-auto"
            >
              Post
            </button>
          </form>
        </div>
        <Blogposts />
      </React.Fragment>
    );
  }
}
export default withContext(HomePage);
