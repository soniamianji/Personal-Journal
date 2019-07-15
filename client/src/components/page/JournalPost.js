import React from "react";
import config from "../../modules/config";
import axios from "axios";
import { withContext } from "../../context/WithContext";
import Blogposts from "../child/Blogposts";
import Moment from "moment";
import AvatarGenerator from "../child/AvatarGenerator";

export default function Journal({ blog }) {
  return (
    <div className="stand container mx-auto border shadow-sm pb-4 bg-light">
      <div className="d-flex m-3 mt-5">
        <AvatarGenerator user={blog.userName} />

        <div className="d-flex flex-column w-75">
          <div className="ml-3  mt-3">
            <h6>{blog.userName}</h6>
          </div>

          <div className="ml-3">
            <small>{Moment(blog.blog_Date).format("LLLL")}</small>
          </div>
        </div>
      </div>

      <div className=" p-3 m-3 ">{blog.text}</div>
    </div>
  );
}

//mp through the users array
//if the users blog is not empty
// return this
