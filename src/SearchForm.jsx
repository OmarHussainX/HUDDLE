import React, {Component} from 'react'
import {weightedScorer} from './weightedScorer'

import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import grey from '@material-ui/core/colors/grey'

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

import MainGallery from './MainGallery'



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

    constructor(props) {
        super(props)
        this.state = {

            // Master array of all available spaces
            spaces: this.props.spaces,

            // Search inputs (dropdowns, date/time pickers, checkboxes, textfields)
            rateInput: '',
            capacityInput: '',
            panelExpanded: null,
            selectedDate: new Date('2019-03-25T15:30:00'),
            selectedEndDate: new Date('2019-03-25T17:45:00'),
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: false,
            sunday: false,
            streetInput: '',
            cityInput: '',
            quadrantInput: '',
        }
    }


    handleChange = event => {
        const { name, value } = event.target
        console.log(`event.target.name, value: '${name}', ${value}`)

        this.setState({
            [name]: value,
        })

        switch(name) {
            case 'rateInput':
            case 'capacityInput':
            // const searchType = name === 'rateInput' ? 'scoreOnRate' : 'scoreOnCapacity'

            // create a new search object, copying all search criteria from state
            // and then update the object with the search criterion from event.target
            // pass this object (and a reference to all spaces) to weightedScorer

            // weightedScorer will need to be updated to skip those score calculations 
            // which have a null/invalid search value

            // Make a deep copy of state in order to pass search criteria and array
            // of all spaces to weightedScorer
            let stateCopy = JSON.parse(JSON.stringify(this.state))
            
            // Make sure the latest user search criterion is saved, since the value in
            // state is not yet guaranteed to have the valuse saved from this latest
            // change event
            stateCopy[name] = value

            // (originally performed a 'smart' shallow copy as follows:
            // 
            // let stateCopy = {...this.state}
            // stateCopy.spaces = [...this.state.spaces]
            //
            // But somehow, values in the 'this.state.spaces' array were being modified
            // at some point. Became obvious when scores would not reset to '1' after
            // clearing search form ('this.state.spaces is reset to 
            // 'this.props.spaces' when search form is cleared)


            // user has specified some new search criterion, and may have specified
            // other criteria in the past - all criteria saved in state
            const newState = weightedScorer(stateCopy)
            this.setState({ spaces: newState.spaces })

            break

            case 'streetInput':
            case 'cityInput':
            // const locSearchType = name === 'streetInput' ? 'street' : 'city'
            break

            default:
        }
    }

    handleDateChange = date => {
        this.setState({ selectedDate: date })
    }


    // Handle search logic related to checkboxes, which are all related to the
    // availability of spaces on particular days of the week
    handleCheckedChange = checkboxName => event => {
        const checkboxState = event.target.checked
        console.log(`'${checkboxName}' checked: '${checkboxState}'`)

        this.setState({ [checkboxName]: checkboxState })
    }



    handlePanelChange = panel => (event, expanded) => {
        this.setState({
            panelExpanded: expanded ? panel : false,
        })
    }


    handleClick = event => {
        const { id } = event.currentTarget
        
        // Clear search results button clicked
        // - reset all search options and inputs
        switch(id) {
        case 'clearSearchButton':
        console.log(`########### clear search results########### `)
        this.props.spaces.forEach(space =>
            console.log(`${space.name} has original score ${space.score}`))

        this.setState({
            spaces: this.props.spaces,
            rateInput: '',
            capacityInput: '',
            panelExpanded: null,
            selectedDate: new Date('2019-03-25T15:30:00'),
            selectedEndDate: new Date('2019-03-25T17:45:00'),
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: false,
            sunday: false,
            streetInput: '',
            cityInput: '',
            quadrantInput: '',
        })
        break

        // Search button clicked... is this useful?
        // - conduct search?
        // - reset all search options and inputs?
        // - hide search form & show FAB?
        case 'searchButton':
        console.log(`search!`)
        break

        default:
        break
        }
    }
    
    
    render() {
        const { classes } = this.props
        const { panelExpanded, monday, tuesday, wednesday, thursday, friday, saturday, sunday} = this.state

        return (
            <div className={classes.root}>
                <Paper className={classes.base} elevation={1}>

                    {/* ---  Create Grid  --- */}
                    <Grid container spacing={24}>

                        {/* ---  Half-width row  --- */}
                        <Grid item xs={6}>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="rateID">
                                    Rate
                                </InputLabel>
                                <Select
                                    value={this.state.rateInput}
                                    onChange={this.handleChange}
                                    inputProps={{
                                        name: 'rateInput',
                                        id: 'rateID',
                                    }}
                                >
                                    <MenuItem value={`Any`}>Any</MenuItem>
                                    <MenuItem value={0}><em>Free</em></MenuItem>
                                    <MenuItem value={25}>$1-25</MenuItem>
                                    <MenuItem value={50}>$26-50</MenuItem>
                                    <MenuItem value={75}>$51-75</MenuItem>
                                    <MenuItem value={100}>Over $75</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* ---  Half-width row  --- */}
                        <Grid item xs={6}>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="capacityID">
                                    Capacity
                                </InputLabel>
                                <Select
                                    value={this.state.capacityInput}
                                    onChange={this.handleChange}
                                    inputProps={{
                                        name: 'capacityInput',
                                        id: 'capacityID',
                                    }}
                                >
                                    <MenuItem value={`Any`}>Any</MenuItem>
                                    <MenuItem value={5}>1-5</MenuItem>
                                    <MenuItem value={10}>6-10</MenuItem>
                                    <MenuItem value={15}>11-15</MenuItem>
                                    <MenuItem value={20}>Over 15</MenuItem>
                                </Select>
                            </FormControl>

                        </Grid>
                        {/* </form> */}

                        {/* <Grid item xs={12}>
                        <Typography variant='overline' align='center'>When is the space needed?</Typography>
                        </Grid> */}

                        {/* ----------------------------------------------------- */}
                        {/* Hide 'advanced' controls inside an expansion panel */}
                        <ExpansionPanel
                            expanded={panelExpanded === 'panel1'}
                            onChange={this.handlePanelChange('panel1')}
                            classes={{ root: classes.expansionpanel, }}
                        >
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                {/* <Typography className={classes.heading}>General settings</Typography> */}
                                <Typography className={classes.secondaryHeading}>Advanced search</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                {/* ---  Create Grid  --- */}
                                <Grid container spacing={24}>

                                    {/* ---  Half-width row  --- */}
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

                                    {/* ---  Half-width row  --- */}
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
                                                            }} checked={monday} 
                                                            onChange={this.handleCheckedChange('monday')} 
                                                            value="monday" />
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
                                                            checked={tuesday} 
                                                            onChange={this.handleCheckedChange('tuesday')} 
                                                            value="tuesday" />
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
                                                            checked={wednesday} 
                                                            onChange={this.handleCheckedChange('wednesday')} 
                                                            value="wednesday" />
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
                                                            checked={thursday} 
                                                            onChange={this.handleCheckedChange('thursday')} 
                                                            value="thursday" />
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
                                                            checked={friday} 
                                                            onChange={this.handleCheckedChange('friday')} 
                                                            value="friday" />
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
                                                            checked={saturday} 
                                                            onChange={this.handleCheckedChange('saturday')} 
                                                            value="saturday" />
                                                    }
                                                    label="Saturday"
                                                />
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
                                            </FormGroup>
                                        </FormControl>
                                    </Grid>

                                    {/* ---  Full-width row  --- */}
                                    <Grid item xs={12}>
                                        <TextField
                                            style={{
                                                width: '180px',
                                            }}
                                            id="address-search-input"
                                            label="Address"
                                            className={classes.textField}
                                            name='streetInput'
                                            margin="normal"
                                            onChange={this.handleChange}
                                            value={this.state.streetInput}
                                        />
                                        <TextField
                                            style={{
                                                width: '100px',
                                            }}
                                            id="city-search-input"
                                            label="City"
                                            className={classes.textField}
                                            name='cityInput'
                                            margin="normal"
                                            onChange={this.handleChange}
                                            value={this.state.cityInput}
                                        />
                                        {(this.state.cityInput.toLowerCase() === 'calgary' ||
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
                                                inputProps={{
                                                    name: 'quadrantInput',
                                                    id: 'quadrantID',
                                                }}
                                                onChange={this.handleChange}
                                                value={this.state.quadrantInput}
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
                        {/* ----------------------------------------------------- */}


                        {/* <Grid container spacing={24} justify="space-between"> */}
                            <Grid item xs={6}>
                                <Button variant="contained" color="default"
                                className={classes.button}
                                onClick={this.handleClick}
                                id='clearSearchButton'
                                >
                                    <Icon className={classes.leftIcon}>delete</Icon>
                                    Clear
                            </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <div style={{textAlign:'right'}}>
                                <Button variant="contained" color="secondary" className={classes.button}
                                onClick={this.handleClick}
                                id='searchButton'
                                >
                                    <Icon className={classes.leftIcon}>search</Icon>
                                    Search
                                </Button>
                                </div>
                            </Grid>
                        </Grid>
                    {/* </Grid> */}
                </Paper>

                <MainGallery
                    onClick={this.props.onClick}
                    spaces={this.state.spaces}
                />

            </div>
        )
    }
}
                    

Search.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true })(Search)
