import React from "react";
import config from "../../modules/config";
import axios from "axios";
import { withContext } from "../../context/WithContext";
import Blogposts from "../child/userBlogs/Blogposts";
import Moment from "moment";
import AvatarGenerator from "../child/AvatarGenerator";
import { Paper } from "@material-ui/core";

export default function Journal({ blog }) {
  return (
    <Paper className="stand container mx-auto p-1 ">
      <div className="d-flex m-2 ml-4">
        <AvatarGenerator user={blog.userName} />

        <div className="d-flex flex-column w-75">
          <div className="ml-3 mt-3">
            <h6>{blog.userName}</h6>
          </div>

          <div className="ml-3">
            <small>{Moment(blog.blog_Date).format("LLLL")}</small>
          </div>
        </div>
      </div>

      <div className=" p-3 m-3 ">{blog.text}</div>
    </Paper>
  );
}

//mp through the users array
//if the users blog is not empty
// return this
