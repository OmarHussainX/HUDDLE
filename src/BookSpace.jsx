import React, {Component} from 'react'

import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import Grid from '@material-ui/core/Grid'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers'

import BookConfirm from './BookConfirm'


const styles = theme => ({
    root: {
    },
  })


class BookSpace extends Component {
    constructor() {
        super()
        this.state = {
            open: false,
            name: '',
            email: '',
            phoneNumber:'',
            selectedDate: new Date('2019-03-25T15:30:00'),
            selectedEndDate: new Date('2019-03-25T17:45:00'),
        }
      }

      handleChange = event => {
        const { name, value } = event.target
        console.log(`event.target.name, value: '${name}', ${value}`)

        this.setState({
            [name]: value,
        })

    }




    handleDateChange = date => {
        console.log(`new date/time: ${date}`)
        this.setState({ selectedDate: date })
    }

    handleClickOpen = () => {
        this.setState({ open: true })
    }

    handleClose = () => {
        this.setState({ 
            open: false,
            name: '',
            email: '',
            phoneNumber:'',
            selectedDate: new Date('2019-03-25T15:30:00'),
            selectedEndDate: new Date('2019-03-25T17:45:00'),
         })
    }

  render() {
    const {classes, selectedSpace} = this.props

    return (
      <div>
        <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
          Book space
        </Button>
        <Dialog
         open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">{selectedSpace.name}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter the desired booking date &amp; time, and your contact information.<br/>
              Your booking request will be sent to the host, who will contact you directly.
            </DialogContentText>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container className={classes.grid} justify="space-evenly">
                    <DatePicker
                        style={{
                            width: '65px',
                        }}
                        margin="normal"
                        label="Date"
                        format="MMM d"
                        value={this.state.selectedDate}
                        onChange={this.handleDateChange}
                    />
                    <TimePicker
                        style={{
                            width: '75px',
                        }}
                        margin="normal"
                        label="Start time"
                        value={this.state.selectedDate}
                        onChange={this.handleDateChange}
                    />
                    <TimePicker
                        style={{
                            width: '75px',
                        }}
                        margin="normal"
                        label="End time"
                        value={this.state.selectedEndDate}
                        onChange={this.handleDateChange}
                        id='endDatePicker'
                    />
                </Grid>
            </MuiPickersUtilsProvider>

            <TextField
              autoFocus
              margin="dense"
              id="name"
              name="name"
              label="Name"
              type="text"
              fullWidth
              onChange={this.handleChange}
              />
             <TextField
              margin="dense"
              id="email"
              name="email"
              label="Email Address"
              type="email"
              fullWidth
              onChange={this.handleChange}
            />
            <TextField
              margin="dense"
              id="phoneNumber"
              name="phoneNumber"
              label="Phone number"
              type="tel"
              fullWidth
              onChange={this.handleChange}
            />
          </DialogContent>

          <DialogActions>
            <Button color="default" onClick={this.handleClose}>
              Cancel
            </Button>

            {/* Booking confirmation modal
                - provide reference to this (BookSpace) component's handleClose() 
                  callback so that the child component (BookConfirm) can close
                  its parent
            */}
            <BookConfirm
                username={this.state.name}
                closeParent={this.handleClose} 
            />

          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

BookSpace.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true })(BookSpace)
