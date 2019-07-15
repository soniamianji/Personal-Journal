import React from "react";
import config from "../../modules/config";
import axios from "axios";
import { withContext } from "../../context/WithContext";
import Moment from "moment";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import DeletePostButton from "./DeletePostButton";
import AvatarGenerator from "./AvatarGenerator";

class SingleBlog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      blogId: "",
      editPostEnabled: false
    };
  }

  componentDidMount() {
    this.props.Context.setUsers();
  }

  //DELETE POST
  deleteBlogHandler = item => {
    console.log(item);
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

  onchangeHandler = e => {
    this.setState({
      text: e.target.value
    });
  };
  //EDIT post
  editPostHandler = item => {
    this.setState({
      editPostEnabled: true,
      text: item.text,
      blogId: item._id
    });
  };
  updateEdit = item => {
    console.log("edit post");
    const AuthorizationHeader = config.AuthorizationHeader();
    const body = {
      text: this.state.text,
      blogId: this.state.blogId
    };
    axios
      .put("/api/editeblogpost", body, AuthorizationHeader)
      .then(response => {
        console.log(response);

        this.setState({
          editPostEnabled: false
        });
        this.props.Context.setUser();
      });
  };

  render() {
    const user = this.props.Context.user;
    const posts = this.props.Context.user.blog;
    const date = this.props.item.blog_Date;
    const itemDate = Moment(date).format("LLLL");
    return (
      <React.Fragment>
        <div className="stand container mx-auto border shadow-sm bg-light">
          <div className="d-flex m-3 mt-5">
            <AvatarGenerator user={user.name} />
            {
              //<img
              //src={require("../../avatar/avatar.png")}
              //className="avatar img-thumbnail"
              ///>
            }

            <div className="d-flex flex-column w-75">
              <div className="ml-3  mt-3">
                <h6>{user.name}</h6>
              </div>

              <div className="ml-3">
                <small>{itemDate}</small>
              </div>
            </div>
          </div>
          {this.state.editPostEnabled ? (
            <form onSubmit={this.onSubmitHandler} className="form-signin ">
              <textarea
                type="text"
                className="form-control border border-warning"
                value={this.state.text}
                onChange={this.onchangeHandler}
              />
            </form>
          ) : (
            <div className=" p-3 m-3 ">{this.props.item.text}</div>
          )}

          <div className="d-flex flex-row-reverse m-3">
            <DeletePostButton
              deleteBlogHandler={this.deleteBlogHandler}
              item={this.props.item}
            />

            {this.state.editPostEnabled ? (
              <button
                className="badge badge-warning ml-1 p-2"
                onClick={() => this.updateEdit(this.props.item)}
              >
                Submit Edit
              </button>
            ) : (
              <button
                className="badge badge-warning ml-1 p-2 w-25"
                onClick={() => this.editPostHandler(this.props.item)}
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default withContext(SingleBlog);
