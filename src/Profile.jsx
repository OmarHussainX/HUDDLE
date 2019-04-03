import React, {Component} from "react"
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography';
class Profile extends Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
          <Typography variant="h1" color="inherit">
            This is the Profile page.
          </Typography>
      </React.Fragment>
    )
  }
} export default Profile

