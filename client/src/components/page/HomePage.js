import React from "react";
import config from "../../modules/config";
import axios from "axios";
import { withContext } from "../../context/WithContext";
import Blogposts from "../child/Blogposts";
import Moment from "moment";

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
    console.log(this.state.date);
    const body = {
      text: this.state.text,
      date: this.state.date,
      id: this.props.Context.user._id
    };
    axios.put("/api/blogPost", body, AuthorizationHeader).then(response => {
      console.log(response.data);
      if (response.data.message === "success!") {
        this.setState({
          posted: true,
          errors: {}
        });
        this.props.Context.setUser();
      }
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

    this.setState({
      text: e.target.value,
      date: Moment().format("LLLL")
    });
  };

  render() {
    const user = this.props.Context.user;
    const posts = this.props.Context.user.blog;
    const { posted } = this.state;
    Moment.locale("en");

    // const now = new Date(Date.now());
    return (
      <React.Fragment>
        <div className=" standParent mx-auto">
          <div className="stand container mx-auto border shadow-sm bg-light">
            <form onSubmit={this.onSubmitHandler} className="form-signin m-2">
              <div className="col mx-auto m-3">
                <h6 className="p-2">{Moment().format("LLLL")} </h6>
                <textarea
                  type="text"
                  rows="3"
                  className="form-control mb-2 mx-auto"
                  onChange={this.onchangeHandler}
                  value={this.state.text}
                  placeholder="Write your wisdom here!"
                />
              </div>

              <div className="d-flex flex-row-reverese">
                {posted ? (
                  <button
                    type="submit"
                    className="btn btn-warning w-25 mb-2 ml-auto mr-3"
                    disabled
                  >
                    Posted
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="btn btn-dark  w-25 mb-2 ml-auto mr-3"
                  >
                    Post
                  </button>
                )}
              </div>
            </form>
          </div>
          <Blogposts />
        </div>
      </React.Fragment>
    );
  }
}
export default withContext(HomePage);
