import React from "react";
import { withContext } from "../../../context/WithContext";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import Icon from "@material-ui/core/Icon";

const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(1)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}));

export default function editPostHandler({ editPostHandler, item }) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />

      <Fab
        color="primary"
        size="small"
        aria-label="Edit"
        className={classes.fab}
        onClick={() => editPostHandler(item)}
      >
        <Icon>edit_icon</Icon>
      </Fab>
    </React.Fragment>
  );
}
