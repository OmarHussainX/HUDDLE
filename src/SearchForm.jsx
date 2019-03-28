import React, {Component} from 'react'
import {SpaceSearch} from './SpaceSearch'
import {weightedSearch} from './WeightedSearch'

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

            // Array of all available spaces
            spaces: this.props.spaces,

            // Array of spaces matching the primary search criterion
            primaryMatches: this.props.spaces,

            // Collection of spaces which did not meet the last search criterion
            rejectedSpaces: [],

            // Collection of spaces which meet the secondary search criterion
            secondaryMatches: [],

            // Store search criteria for display...
            searchHistory: [],

            // Search inputs (dropdowns, date/time pickers, checkboxes, textfields)
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
            streetInput: '',
            cityInput: '',
            quadrant: '',
        }
    }


    handleChange = event => {
        const { name, value } = event.target
        console.log(`event.target.name, value: '${name}', ${value}`)

        const { spaces, rejectedSpaces } = this.state

        this.setState({
            [name]: value,
        })

        switch(name) {
            case 'rate':
            case 'capacity':
            const searchType = name === 'rate' ? 'filterByRate' : 'filterByCapacity'

            // user has specified rate OR capacity search criteria
            const newState = weightedSearch(this.state)
            this.setState({ spaces: newState.spaces })

            break

            case 'streetInput':
            case 'cityInput':
            const locSearchType = name === 'streetInput' ? 'street' : 'city'
            break

            default:
        }
    }

    handleDateChange = date => {
        // console.log(`date/time: '${date}'`)
        this.setState({ selectedDate: date })
    }


    // Handle search logic related to checkboxes, which are all related to the
    // availability of spaces on particular days of the week
    handleCheckedChange = checkboxName => event => {
        const { spaces, rejectedSpaces } = this.state
        const checkboxState = event.target.checked
        console.log(`'${checkboxName}' checked: '${checkboxState}'`)

        
        // A day's checkbox has selected - need to search for spaces avaialable
        // on that day (update the primary matches if no search has been done yet,
        // otherwise update the secondary results...)
        //
        // - toggle the state (true/false)
        if (checkboxState) {
            
            const matchesLog = SpaceSearch.filterByAvailability(spaces, checkboxName)
            console.log(`${matchesLog.length} matches spaces open on: ${checkboxName}`)

            // A search criteria had already been selected, primary matches were
            // found, and the rest were added to 'rejects'...
            // So just need to update secondary matches...
            if (rejectedSpaces.length) {
                const matches = SpaceSearch.filterByAvailability(spaces, checkboxName)
                
                this.setState(prevState => {
                    const newHistory = [...prevState.searchHistory]
                    newHistory.push(`[${checkboxName}: ${checkboxState}] `)

                    return {
                        secondaryMatches: matches,
                        // rejectedSpaces: rejects
                        searchHistory: newHistory
                    }
                })

            // no filtering has been done (not successfully anyway), so perform
            // a primary search, and update the rejects...
            } else {
                const matches = SpaceSearch.filterByAvailability(spaces, checkboxName)

                // rejects are spaces which are not present in 'matches'
                // i.e. the difference between the set of all spaces and
                // those that are in 'matches'
                let rejects = spaces.filter(o => !matches.some(v => v.id === o.id))

                this.setState(prevState => {
                    const newHistory = [...prevState.searchHistory]
                    newHistory.push(`[${checkboxName}: ${checkboxState}] `)

                    return {
                        primaryMatches: matches,
                        rejectedSpaces: rejects,
                        searchHistory: newHistory
                    }
                })
            }



        // A day's checkbox has been de-selected.... what do we do now!?
        // - somehow remove it from the search criteria/match results
        } else {
            //

        }

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
        // - reset the arrays of search results
        switch(id) {
        case 'clearSearchButton':
        console.log(`clear search results`)
        this.setState({
            spaces: this.props.spaces,
            primaryMatches: this.props.spaces,
            rejectedSpaces: [],
            secondaryMatches: [],
            searchHistory: [],
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
            streetInput: '',
            cityInput: '',
            quadrant: '',
        })
        break

        // Search button clicked
        // - get search criteria from state
        // - conduct search (easier said than done! how to search on multiple criteria?)
        // - update primary, secondary search match arrays
        // - reset all search options and inputs
        // - reset the array of primary matches
        case 'searchButton':
        console.log(`search!`)
        break

        default:
        break
        }
    }
    
    
    render() {
        const { classes } = this.props
        const { panelExpanded, sunday, monday, tuesday, wednesday, thursday, friday, saturday, primaryMatches, secondaryMatches } = this.state

        return (
            <div className={classes.root}>
                <Paper className={classes.base} elevation={1}>

                    {/* ---  Create Grid  --- */}
                    <Grid container spacing={24}>

                        {/* ---  Full-width row  --- */}
                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom className={classes.h6}>
                                {`${primaryMatches.length} matches`}
                            </Typography>
                            <Typography gutterBottom className={classes.h6}>
                                {secondaryMatches.length ? `(${secondaryMatches.length} secondary matches)` : ''}
                                <br />
                                SEARCH HISTORY:
                                <br />
                                {this.state.searchHistory}
                            </Typography>
                        </Grid>
                        {/* <form className={classes.root} autoComplete="off"> */}

                        {/* ---  Half-width row  --- */}
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
                                                    name: 'quadrant',
                                                    id: 'quadrantID',
                                                }}
                                                onChange={this.handleChange}
                                                value={this.state.quadrant}
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
