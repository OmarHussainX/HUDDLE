import React, {Component} from "react"
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography';
class About extends Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
          <Typography variant="h1" color="inherit">
            This is the about page.
          </Typography>
      </React.Fragment>
    )
  }
} export default About
