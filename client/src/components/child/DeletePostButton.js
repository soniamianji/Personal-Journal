import React from "react";
import { withContext } from "../../context/WithContext";
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

export default function DeletePostButton({ deleteBlogHandler, item }) {
  const classes = useStyles();

  return (
    <Button
      variant="contained"
      color="secondary"
      className={classes.button}
      onClick={() => deleteBlogHandler(item)}
    >
      Delete
      <DeleteIcon className={classes.rightIcon} />
    </Button>
  );
}
