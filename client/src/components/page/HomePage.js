import React from "react";
import config from "../../modules/config";
import axios from "axios";
import { withContext } from "../../context/WithContext";
import Blogposts from "../child/userBlogs/Blogposts";
import Moment from "moment";
import Blogform from "../child/BlogForm";
import Button from "@material-ui/core/Button";
import { Paper } from "@material-ui/core";
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
    const value = this.state.text;
    Moment.locale("en");

    // const now = new Date(Date.now());
    return (
      <React.Fragment>
        <div className=" standParent mx-auto">
          <Paper className="stand container mx-auto p-2">
            <form onSubmit={this.onSubmitHandler} className="form-signin m-2">
              <div className="col mx-auto m-3">
                <h6 className="p-2">{Moment().format("LLLL")} </h6>
                <Blogform
                  onchangeHandler={this.onchangeHandler}
                  value={value}
                />
              </div>

              <div className="d-flex flex-row-reverese">
                {posted ? (
                  <Button
                    type="submit"
                    variant="outlined"
                    color="secondary"
                    className="ml-auto mr-3"
                  >
                    Posted
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    className="ml-auto mr-3"
                  >
                    Post
                  </Button>
                )}
              </div>
            </form>
          </Paper>
          <Blogposts />
        </div>
      </React.Fragment>
    );
  }
}
export default withContext(HomePage);
