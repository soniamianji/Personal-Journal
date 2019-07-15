import React, { useEffect } from "react";
import config from "../../modules/config";
import axios from "axios";
import { withContext } from "../../context/WithContext";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  input: {
    margin: theme.spacing(1)
  }
}));

export default function Blogform({ onchangeHandler, value }) {
  const classes = useStyles();

  return (
    <TextField
      id="outlined-dense-multiline"
      style={{ margin: 8 }}
      placeholder="Write your wisdom here!"
      className={classes.input}
      onChange={onchangeHandler}
      value={value}
      fullWidth
      margin="normal"
      InputLabelProps={{
        shrink: true
      }}
      variant="filled"
      multiline
      rowsMax="4"
    />
  );
}
