import React, { useEffect } from "react";
import config from "../../../modules/config";
import axios from "axios";
import { withContext } from "../../../context/WithContext";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  leftIcon: {
    marginRight: theme.spacing(1)
  },
  rightIcon: {
    marginLeft: theme.spacing(1)
  },
  iconSmall: {
    fontSize: 20
  }
}));

export default function DeletePostButton({ deleteResBool, item }) {
  const classes = useStyles();
  //DELETE POST
  const deleteBlogHandler = item => {
    console.log(item);
    const AuthorizationHeader = config.AuthorizationHeader();
    axios
      .delete(`/api/deleteblog/${item._id}`, AuthorizationHeader)

      .then(response => {
        console.log(response);
        if (response.status == 200) {
          deleteResBool();
        }
      });
  };
  return (
    <Button
      variant="contained"
      size="small"
      color="secondary"
      className={classes.button}
      onClick={() => deleteBlogHandler(item)}
    >
      Delete
      <DeleteIcon className={classes.rightIcon} />
    </Button>
  );
}
