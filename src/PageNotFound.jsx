import React, {Component} from "react"
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline'
class PageNotFound extends Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Typography variant="h1" color="inherit">Oops!</Typography>
        <Typography variant="h2" color="inherit">The page you were looking for isn't here...</Typography>
      </React.Fragment>
    )
  }
} export default PageNotFound
