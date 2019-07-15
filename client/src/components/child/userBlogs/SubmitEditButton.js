import React from "react";
import config from "../../../modules/config";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";

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
export default function SubmitEditButton({ updateRes, body, item }) {
  const classes = useStyles();

  const updateEdit = item => {
    console.log("edit post");
    const AuthorizationHeader = config.AuthorizationHeader();

    axios
      .put("/api/editeblogpost", body, AuthorizationHeader)
      .then(response => {
        console.log(response);
        updateRes();
      });
  };
  return (
    <React.Fragment>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      <Button
        variant="contained"
        color="primary"
        size="small"
        className={classes.button}
        onClick={() => updateEdit(item)}
      >
        Update
        <Icon className={classes.rightIcon}>send</Icon>
      </Button>
    </React.Fragment>
  );
}
