import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
// import blue from '@material-ui/core/colors/blue'
import grey from '@material-ui/core/colors/grey'
// import Chip from '@material-ui/core/Chip'
// import Input from '@material-ui/core/Input'
// import OutlinedInput from '@material-ui/core/OutlinedInput'
// import FilledInput from '@material-ui/core/FilledInput'

import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField'

import Grid from '@material-ui/core/Grid'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers'

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Icon from '@material-ui/core/Icon'
import Button from '@material-ui/core/Button'





// const freeChipColor = blue[200]
const freeChipColor = grey[200]

const styles = theme => ({
    root: {
        maxWidth: 400,  //needed?
        flexGrow: 1,
    },
    base: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        // minHeight: '400px',
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    h6: {
        textShadow: '0px 0px 4px rgba(100,100,100,0.3)',
        textAlign: 'center',
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
    formLabel: {
        height: 24,
    },
    checkbox: {
        height: 24,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 120,
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    expansionpanel: {
        border: 'none',
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
    },
    expanded: {
        margin: 'auto',
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
})

class Search extends Component {

    constructor() {
        super()
        this.state = {
            rate: '',
            capacity: '',
            panelExpanded: null,
            selectedDate: new Date('2019-03-25T15:30:00'),
            selectedEndDate: new Date('2019-03-25T17:45:00'),
            sunday: false,
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: false,
            addressInput: '',
            quadrant: '',
            cityInput: '',
        }
    }


    // --> No binding needed when using arrow notation! <--
    // Ensures state always contains the latest input for:
    // - account name & balance when account creation is actve
    // - deposit/withdrawal amount when deposit/withdrawal is active
    handleChange = event => {
        console.log(`event.target: ${event.target}`)
        let { name, value } = event.target
        console.log(`event.target.name, value: '${name}', ${value}`)

        this.setState({
            [name]: value,
        })
    }
    handleDateChange = date => {
        console.log(`date/time: '${date}'`)
        this.setState({ selectedDate: date })
    }

    handleCheckedChange = name => event => {
        console.log(`${name}: '${event.target.checked}'`)
        this.setState({ [name]: event.target.checked });
    }
    handlePanelChange = panel => (event, expanded) => {
        this.setState({
            panelExpanded: expanded ? panel : false,
        })
    }
    
    
    render() {
        const { classes, theme, filteredSpaces } = this.props
        const { panelExpanded, sunday, monday, tuesday, wednesday, thursday, friday, saturday } = this.state

        return (
            <div className={classes.root}>
            <Paper className={classes.base} elevation={1}>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom className={classes.h6}>
                            {`${filteredSpaces.length} matches...`}
                        </Typography>
                        {/* <Paper className={classes.paper}>xs=12</Paper> */}
                    </Grid>
                    {/* <form className={classes.root} autoComplete="off"> */}
                    <Grid item xs={6}>
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

                        {/* <Paper className={classes.paper}>xs=6</Paper> */}
                    </Grid>
                    <Grid item xs={6}>
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

                        {/* <Paper className={classes.paper}>xs=6</Paper> */}
                    </Grid>
                    {/* </form> */}

                    {/* <Grid item xs={12}>
                        <Typography variant='overline' align='center'>When is the space needed?</Typography>
                    </Grid> */}
                    <ExpansionPanel 
                    expanded={panelExpanded === 'panel1'} 
                    onChange={this.handlePanelChange('panel1')}
                    classes={{
                        root: classes.expansionpanel,
                    }}
                    >
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    {/* <Typography className={classes.heading}>General settings</Typography> */}
                    <Typography className={classes.secondaryHeading}>Advanced search</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                    <Grid container spacing={24}>
                    <Grid item xs={6}>

                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid container className={classes.grid} justify="space-around">
                                    <DatePicker
                                        margin="normal"
                                        label="Date"
                                        value={this.state.selectedDate}
                                        onChange={this.handleDateChange}
                                    />
                                    <TimePicker
                                        margin="normal"
                                        label="Start time"
                                        value={this.state.selectedDate}
                                        onChange={this.handleDateChange}
                                    />
                                    <TimePicker
                                        margin="normal"
                                        label="End time"
                                        value={this.state.selectedEndDate}
                                        onChange={this.handleDateChange}
                                        id='endDatePicker'
                                    />
                                </Grid>
                            </MuiPickersUtilsProvider>

                        {/* <Paper className={classes.paper}>xs=6</Paper> */}
                    </Grid>
                    <Grid item xs={6}>

                    <FormControl component="fieldset" className={classes.formControl}>
                            <FormLabel component="legend">
                                <br />&nbsp;
                            </FormLabel>
                            <FormGroup>
                                <FormControlLabel
                                    className={classes.formLabel}
                                    control={
                                        <Checkbox
                                        classes={{
                                            root: classes.checkbox,
                                        }}
                                        checked={sunday}
                                        onChange={this.handleCheckedChange('sunday')}
                                        value="sunday"
                                        />
                                    }
                                    label="Sunday"
                                />
                                <FormControlLabel
                                    className={classes.formLabel}
                                    control={
                                        <Checkbox
                                        classes={{
                                            root: classes.checkbox,
                                        }} checked={monday} onChange={this.handleCheckedChange('monday')} value="monday" />
                                    }
                                    label="Monday"
                                />
                                <FormControlLabel
                                    className={classes.formLabel}
                                    control={
                                        <Checkbox
                                        classes={{
                                            root: classes.checkbox,
                                        }}
                                        checked={tuesday} onChange={this.handleCheckedChange('tuesday')} value="tuesday" />
                                    }
                                    label="Tuesday"
                                />
                                <FormControlLabel
                                    className={classes.formLabel}
                                    control={
                                        <Checkbox 
                                        classes={{
                                            root: classes.checkbox,
                                        }}
                                        checked={wednesday} onChange={this.handleCheckedChange('wednesday')} value="wednesday" />
                                    }
                                    label="Wednesday"
                                />
                                <FormControlLabel
                                    className={classes.formLabel}
                                    control={
                                        <Checkbox 
                                        classes={{
                                            root: classes.checkbox,
                                        }}
                                        checked={thursday} onChange={this.handleCheckedChange('thursday')} value="thursday" />
                                    }
                                    label="Thursday"
                                />
                                <FormControlLabel
                                    className={classes.formLabel}
                                    control={
                                        <Checkbox 
                                        classes={{
                                            root: classes.checkbox,
                                        }}
                                        checked={friday} onChange={this.handleCheckedChange('friday')} value="friday" />
                                    }
                                    label="Friday"
                                />
                                <FormControlLabel
                                    className={classes.formLabel}
                                    control={
                                        <Checkbox 
                                        classes={{
                                            root: classes.checkbox,
                                        }}
                                        checked={saturday} onChange={this.handleCheckedChange('saturday')} value="saturday" />
                                    }
                                    label="Saturday"
                                />
                            </FormGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                            <TextField
                                style={{
                                    width: '180px',
                                }}
                                id="address-search-input"
                                label="Address"
                                className={classes.textField}
                                name='addressInput'
                                value={this.state.addressInput}
                                onChange={this.handleChange}
                                margin="normal"
                            />
                            <TextField
                                style={{
                                    width: '100px',
                                }}
                                id="city-search-input"
                                label="City"
                                className={classes.textField}
                                name='cityInput'
                                value={this.state.cityInput}
                                onChange={this.handleChange}
                                margin="normal"
                            />
                            { (this.state.cityInput.toLowerCase() === 'calgary' ||
                                this.state.cityInput.toLowerCase() === 'edmonton') &&
                            (<FormControl className={classes.formControl}
                                style={{
                                    width: '90px',
                                    minWidth: '90px'
                                }}
                            >
                                <InputLabel htmlFor="quadrantID">
                                    Quadrant
                                </InputLabel>
                                <Select
                                    value={this.state.quadrant}
                                    onChange={this.handleChange}
                                    inputProps={{
                                        name: 'quadrant',
                                        id: 'quadrantID',
                                    }}
                                >
                                    <MenuItem value={'NW'}>NW</MenuItem>
                                    <MenuItem value={'SW'}>SW</MenuItem>
                                    <MenuItem value={'NE'}>NE</MenuItem>
                                    <MenuItem value={'SE'}>SE</MenuItem>
                                </Select>
                            </FormControl>)}
                        </Grid>
                        </Grid>
                        </ExpansionPanelDetails>
                        </ExpansionPanel>

                        <Grid item xs={8}>
                            <Button variant="contained" color="primary" className={classes.button}>
                                <Icon className={classes.leftIcon}>search</Icon>
                                Search
                            </Button>
                        </Grid>
                        <Grid item xs={4}>
                            <Button variant="contained" color="default" className={classes.button}>
                                <Icon className={classes.leftIcon}>delete</Icon>
                                {/* <DeleteIcon className={classes.leftIcon} /> */}
                                Clear
                            </Button>
                        </Grid>
                </Grid>
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
