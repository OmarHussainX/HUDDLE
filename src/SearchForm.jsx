import 'date-fns'
import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import {withStyles} from '@material-ui/core/styles'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  TimePicker,
  DatePicker,
} from 'material-ui-pickers'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  grid: {
    justifyContent: 'center',
  },
  formControl: {
    margin: theme.spacing.unit,
    width: '225px',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  dense: {
    marginTop: 19,
  },
})

class TempMenu extends React.Component {
  state = {
    // The first commit of Material-UI
    selectedDate: new Date(),
    capacity: '',
    address:'',
  }

  handleDateChange = date => {
    this.setState({selectedDate: date})
  }

  handleChange = event => {
    const {name, value} = event.target
    this.setState({ [name]: value });
  };

  render() {
    const {classes} = this.props
    const {selectedDate} = this.state

    return (
      <div>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container className={classes.grid} justify="space-around">

            <Typography variant="h5" component="h3">
              Book a meeting room or event space.
            </Typography>


            <TextField
              id="standard-address"
              label="Address"
              name="address"
              className={classes.textField}
              value={this.state.address}
              onChange={this.handleChange}
              margin="normal"
            />
            <DatePicker
              margin="normal"
              label="Date"
              value={selectedDate}
              onChange={this.handleDateChange}
            />
            <TimePicker
              margin="normal"
              label="Start"
              value={selectedDate}
              onChange={this.handleDateChange}
            />

            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="capacity-simple">Capacity</InputLabel>
              <Select
                value={this.state.capacity}
                onChange={this.handleChange}
                inputProps={{
                  name: 'capacity',
                  id: 'capacity-simple',
                }}>
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>

          </Grid>
        </MuiPickersUtilsProvider>
      </div>
    )
  }
}

TempMenu.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(TempMenu)
