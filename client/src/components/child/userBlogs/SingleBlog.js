import React from "react";
import { withContext } from "../../../context/WithContext";
import Moment from "moment";
import DeletePostButton from "./DeletePostButton";
import AvatarGenerator from "../AvatarGenerator";
import EditPostButton from "./EditPostButton";
import SubmitEditButton from "./SubmitEditButton.js";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";

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

  deleteResBool = () => {
    this.props.Context.setUser();
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

  updateRes = () => {
    this.setState({
      editPostEnabled: false
    });
    this.props.Context.setUser();
  };

  render() {
    const user = this.props.Context.user;
    const posts = this.props.Context.user.blog;
    const date = this.props.item.blog_Date;
    const itemDate = Moment(date).format("LLLL");
    const body = {
      text: this.state.text,
      blogId: this.state.blogId
    };
    return (
      <React.Fragment>
        <Paper className="stand container mx-auto p-3 mt-3">
          <div className="d-flex m-2 ml-4">
            <AvatarGenerator user={user.name} />
            <div className="d-flex flex-column w-75">
              <div className="ml-3 mt-3">
                <h6>{user.name}</h6>
              </div>

              <div className="ml-3">
                <small>{itemDate}</small>
              </div>
            </div>
          </div>
          {this.state.editPostEnabled ? (
            <form className="form-signin p-3">
              <TextField
                id="outlined-dense-multiline"
                style={{ margin: 8 }}
                value={this.state.text}
                onChange={this.onchangeHandler}
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true
                }}
                variant="filled"
                multiline
                rowsMax="4"
              />
            </form>
          ) : (
            <div className=" p-2 m-2 ml-3">{this.props.item.text}</div>
          )}

          <div className="text-right mb-2 mr-4">
            {this.state.editPostEnabled ? (
              <SubmitEditButton
                body={body}
                item={this.props.item}
                updateRes={this.updateRes}
              />
            ) : (
              <EditPostButton
                editPostHandler={this.editPostHandler}
                item={this.props.item}
              />
            )}
            <DeletePostButton
              deleteResBool={this.deleteResBool}
              item={this.props.item}
            />
          </div>
        </Paper>
      </React.Fragment>
    );
  }
}
export default withContext(SingleBlog);
