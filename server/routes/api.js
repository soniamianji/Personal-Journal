const express = require("express");
const users = require("mongoose").model("User");
const validator = require("validator");
const router = new express.Router();

let myBodyParser = body => {
  var reqBody = {};
  for (var key in body) {
    reqBody = JSON.parse(key);
  }
  return reqBody;
};

/**
 * Validate the login form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result,
 *                   errors tips, and a global message for the whole form.
 */
function formValidationUserName(payload) {
  const errors = {};
  let isFormValid = true;
  let message = "";

  if (
    !payload ||
    typeof payload.userName !== "string" ||
    payload.userName.trim().length === 0
  ) {
    isFormValid = false;
    errors.name = "Please provide your name.";
  }
  if (!isFormValid) {
    message = "Check the form for errors.";
  }
  return {
    success: isFormValid,
    message,
    errors
  };
}
/**
 * Validate the login form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result,
 *                   errors tips, and a global message for the whole form.
 */
function formValidationEmail(payload) {
  const errors = {};
  let isFormValid = true;
  let message = "";

  if (
    !payload ||
    typeof payload.email !== "string" ||
    typeof payload.password !== "string" ||
    !validator.isEmail(payload.email) ||
    payload.email.trim().length === 0 ||
    payload.password.trim().length === 0
  ) {
    isFormValid = false;
    errors.name =
      payload.email.trim().length === 0
        ? "Please enter your email."
        : payload.password.trim().length === 0
        ? "Please enter your password."
        : !validator.isEmail(payload.email)
        ? "your email address is not validated."
        : "Something went wrong, please make sure that you have entered valid email and password.";
  }
  if (!isFormValid) {
    message = "Check the form for errors.";
  }
  return {
    success: isFormValid,
    message,
    errors
  };
}

router.get("/getuser", (req, res) => {
  res.status(200).json({
    user: req.user
  });
});

router.get("/getallusers", (req, res) => {
  users.find({}).then((users, err) => {
    if (err) {
      return res.status(401);
    }
    res.status(200).json({ users });
  });
});

router.put("/editusername", (req, res) => {
  req.body = myBodyParser(req.body);
  const id = req.user._id;

  const validationResult = formValidationUserName(req.body);
  console.log(validationResult);
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors.name
    });
  }
  users.findById(id, function(err, user) {
    if (err) {
      return res.status(401);
    }
    user.name = req.body.userName;
    user.save(function(err) {
      if (err) {
        console.error("ERROR!");
        return res.status(401);
      }
      res.status(200).json({ user });
    });
  });
});

router.delete("/deleteuser", (req, res) => {
  console.log("aleylk");
  const id = req.user._id;
  console.log(id);
  users.findById(id, function(err, user) {
    if (err) {
      return res.status(401);
    }
    users.deleteOne(user, function(err) {
      if (err) {
        return res.status(401);
      }
      return res.status(202).json({});
    });
  });
});

router.put("/editemail", (req, res) => {
  req.body = myBodyParser(req.body);
  const id = req.user._id;
  const pass = req.body.password;
  const validationResult = formValidationEmail(req.body);
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors.name
    });
  }
  users.findById(id, function(err, user) {
    if (err) return res.status(401);
    if (user) {
      user.comparePassword(pass, (passwordErr, isMatch) => {
        if (passwordErr) return res.status(401);
        if (isMatch) {
          users.findOne(req.body.email, (err, exist) => {
            if (exist) return res.status(401);
            user.email = req.body.email;
            user.save(function(err) {
              if (err) return res.status(401);
              res.status(200).json({ user });
            });
          });
        }
      });
    }
  });
});

router.put("/blogPost", (req, res) => {
  req.body = myBodyParser(req.body);
  const id = req.body.id;
  users.findById(id, function(err, user) {
    if (err) {
      return res.status(401);
    } else if (user) {
      user.blog.push({ blog_Date: req.body.date, text: req.body.text });
      user.save(function(err, obj) {
        if (err) {
          console.log("there was an error");
        } else {
          console.log(obj);
          res.status(200).json({ message: "success!" });
        }
      });
    }
  });
});

//DELETE SELECTED USER BLOG
router.delete("/deleteblog/:id", (req, res) => {
  console.log("oj");
  console.log(req.params.id);
  const id = req.params.id;
  let user = req.user;
  const blog = user.blog.filter(b => b._id != id);
  user.blog = blog;
  user.save((err, data) => {
    console.log(data);
    if (!err) {
      res.status(200).json({});
    } else {
      res.status(401);
    }
  });
});

//Edit Selected Blog Post
router.put("/editeblogpost", (req, res) => {
  req.body = myBodyParser(req.body);
  const user = req.user;
  const Userid = req.user.id;
  const userBlogId = req.body.blogId;
  console.log(Userid);
  console.log(userBlogId);
  let blogs = user.blog;
  console.log(blogs);
  let blog = blogs.find(el => {
    return el._id == userBlogId;
  });

  blog.text = req.body.text;
  blogs = blogs.filter(b => b._id != userBlogId);
  blogs.push(blog);
  user.blog = blogs;
  user.save((err, data) => {
    console.log(data);
    if (!err) {
      res.status(200).json({});
    } else {
      res.status(401);
    }
  });
  // users.findOne(
  //   { _id: Userid },
  //   { blog: { $elemMatch: { _id: userBlogId } } },
  //   (err, obj) => {
  //     if (err) {
  //       console.log("errr");
  //     } else {
  //       console.log(obj);
  //       obj.text = req.body.text;
  //       const i = user.blog.indexOf(obj);
  //       console.log(i);
  //       // user.blog[0].text = obj.text;

  //       // user.save((err, data) => {
  //       //   console.log(data);
  //       //   if (!err) {
  //       //     res.status(200).json({});
  //       //   } else {
  //       //     res.status(401);
  //       //   }
  //       // });
  //     }
  //   }
  // );

  // users.findOneAndUpdate(
  //   { user.blog: { _id: "blogid" } },
  //   {
  //     $set: {
  //       text: reqblog.text,
  //       date: reqblog.date
  //     }
  //   },
  //   (err, result) => {
  //     if (err) return res.send(err);
  //     res.send(result);
  //   }
  // );
});
//   users.findOneAndUpdate({ blog }, update, options, callback);
// });
module.exports = router;
