import React from "react";
import config from "../../modules/config";
import axios from "axios";
import { withContext } from "../../context/WithContext";
import Blogposts from "../child/Blogposts";
import Moment from "moment";

class Journal extends React.Component {
  state = {};
  componentDidMount() {
    const user = this.props.user;
    user.blog.sort(function(a, b) {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return new Date(a.blog_Date) - new Date(b.blog_Date);
    });
  }
  render() {
    const user = this.props.user;
    return (
      <React.Fragment>
        {user.blog &&
          user.blog.map((blog, i) => (
            <div className="stand container mx-auto border shadow-sm pb-4 ">
              <div className="d-flex m-3 mt-5">
                <img
                  src={require("../../avatar/avatar.png")}
                  className="avatar img-thumbnail"
                />

                <div className="d-flex flex-column w-75">
                  <div className="ml-3  mt-3">
                    <h6>{user.name}</h6>
                  </div>

                  <div className="ml-3">
                    <small>{Moment(blog.blog_Date).format("LLLL")}</small>
                  </div>
                </div>
              </div>

              <div className="border  p-3 m-3 ">{blog.text}</div>
            </div>
          ))}
      </React.Fragment>
    );
  }
}
export default withContext(Journal);

//mp through the users array
//if the users blog is not empty
// return this
