import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
// import blue from '@material-ui/core/colors/blue'
import grey from '@material-ui/core/colors/grey'
import Chip from '@material-ui/core/Chip'
import Input from '@material-ui/core/Input'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import FilledInput from '@material-ui/core/FilledInput'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'

import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

import Grid from '@material-ui/core/Grid'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers'


// const freeChipColor = blue[200]
const freeChipColor = grey[200]

const styles = theme => ({
    root: {
        maxWidth: 400,
        flexGrow: 1,
    },
    h6: {
        textShadow: '0px 0px 4px rgba(100,100,100,0.3)',
        textAlign: 'center',
    },
    base: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        minHeight: '400px',
    },
    img: {
        height: 255,
        display: 'block',
        maxWidth: 400,
        overflow: 'hidden',
        width: '100%',
    },
    chip: {
        float: 'right',
        backgroundColor: freeChipColor,
        borderRadius: '3px',
        height: '24px',
        color: 'black',
        textShadow: '0px 0px 2px rgba(25,25,25,0.3)',
        padding: '1px',
        // fontWeight: 'bold',
        // marginRight: '10px',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
})

class Search extends Component {

    constructor() {
        super()
        this.state = {
            rate: '',
            capacity: '',
            selectedDate: new Date('2014-08-18T21:11:54'),
        }
    }


    // --> No binding needed when using arrow notation! <--
    // Ensures state always contains the latest input for:
    // - account name & balance when account creation is actve
    // - deposit/withdrawal amount when deposit/withdrawal is active
    handleChange = event => {
        console.log(`event.target: ${event.target}`)
        const { name, value } = event.target
        console.log(`event.target.name, value: '${name}', ${value}`)
        this.setState({
            [name]: value,
        })
    }
    handleDateChange = date => {
        this.setState({ selectedDate: date })
      }

    render() {
        const { classes, theme, filteredSpaces } = this.props
        const { selectedDate } = this.state

        return (
            <div className={classes.root}>
                <Paper className={classes.base} elevation={1}>

                    <Typography variant="h6" gutterBottom className={classes.h6}>
                        {`${filteredSpaces.length} matches...`}
                    </Typography>
                    <form className={classes.root} autoComplete="off">
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="rateID">
                                Rate
                            </InputLabel>
                            <Select
                                value={this.state.rate}
                                onChange={this.handleChange}
                                inputProps={{
                                    name: 'rate',
                                    id: 'rateID',
                                }}
                            >

                                <MenuItem value={0}><em>Free</em></MenuItem>
                                <MenuItem value={25}>$0-25</MenuItem>
                                <MenuItem value={50}>$26-50</MenuItem>
                                <MenuItem value={75}>$51-75</MenuItem>
                                <MenuItem value={100}>Over $75</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="capacityID">
                                Capacity
                            </InputLabel>
                            <Select
                                value={this.state.capacity}
                                onChange={this.handleChange}
                                inputProps={{
                                    name: 'capacity',
                                    id: 'capacityID',
                                }}
                            >
                                <MenuItem value={5}>1-5</MenuItem>
                                <MenuItem value={10}>6-10</MenuItem>
                                <MenuItem value={15}>11-15</MenuItem>
                                <MenuItem value={20}>Over 15</MenuItem>
                            </Select>
                        </FormControl>
                    </form>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container className={classes.grid} justify="space-around">
                            <DatePicker
                                margin="normal"
                                label="Booking date"
                                value={selectedDate}
                                onChange={this.handleDateChange}
                            />
                            <TimePicker
                                margin="normal"
                                label="Start time"
                                value={selectedDate}
                                onChange={this.handleDateChange}
                            />
                        </Grid>
                    </MuiPickersUtilsProvider>
                </Paper>
            </div>
        )
    }
}
                    

Search.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true })(Search)
