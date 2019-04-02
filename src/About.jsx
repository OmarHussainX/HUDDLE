import React, {Component} from "react"
class About extends Component {
  state = {
    selectedSpace: ''
  }
  render() {
    return (
      <React.Fragment>
        <h1>This is the About page!</h1>
        <h6>{this.props.location.state.selectedSpace.description}</h6>
      </React.Fragment>
    )
  }
} export default About
