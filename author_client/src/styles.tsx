import { createStyles, makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => createStyles({
  container: {
    minHeight: "100vh"
  },
  button: {
    backgroundColor: "#cc2f13",
    "&:hover": {
      backgroundColor: "#bb2f13",
    },
    margin: "12px"
  },
  error: {
    color: "#bb2f13",
    fontWeight: "bold"
  },
  loading: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center"
  },
  centerText: {
    textAlign: "center"
  },
  pageTitle: {
    cursor: "pointer"
  },
  navbar: {
    justifyContent: "space-between"
  },
  alignLeft: {
    display: "flex",
    justifyContent: "flex-end",
    margin: "12px"
  }
}));