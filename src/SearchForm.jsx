import React, {Component} from 'react'
import {weightedScorer} from './weightedScorer'

import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import grey from '@material-ui/core/colors/grey'
import blueGrey from '@material-ui/core/colors/blueGrey'

import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import FormLabel from '@material-ui/core/FormLabel'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
// import FormHelperText from '@material-ui/core/FormHelperText'
import Checkbox from '@material-ui/core/Checkbox'
import TextField from '@material-ui/core/TextField'

import Grid from '@material-ui/core/Grid'

import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import Icon from '@material-ui/core/Icon'
import Button from '@material-ui/core/Button'

import MainGallery from './MainGallery'

import { palette } from '@material-ui/system'

// Declare cities with quadrants (NE, NW, SE, SW) - when such cities are
// entered as a filter criteria by the user, display quadrant-filtering option
const citiesWithQuadrants = ['calgary', 'edmonton']

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
    filtersummary: {
        padding: theme.spacing.unit * 2,
        // textAlign: 'center',
        // color: theme.palette.text.secondary,
        backgroundColor: blueGrey[50],
        border: '1px solid silver',
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
        minWidth: 100,
    },
    formLegend: {
        marginBottom: 8,
    },
    fromControlLabel: {
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
    modal: {
        display: 'block', /* Hidden by default */
        position: 'fixed', /* Stay in place */
        zIndex: 10000000, /* Sit on top */
        width: '100%', /* Full width */
        height: '100%', /* Full height */
        overflow: 'auto', /* Enable scroll if needed */
        // backgroundColor: 'rgb(0,0,0)', /* Fallback color */
        backgroundColor: 'rgba(0,0,0,0.4)', /* Black w/ opacity */
        top: 0,
        left: 0,
        // transform: `translate(-50%, -$50%)`,
    },
    dayControl: {
        display: 'inline-block',
        width: '25px',
        minWidth: '25px',
        padding:'5px',
        marginRight: '3px',
        borderRadius: '3px',
        backgroundColor: grey[200],
        textAlign: 'center',
        // fontSize: '1rem',
        // fontWeight: 500,
        cursor: 'pointer',
    }
})

class Search extends Component {

    constructor(props) {
        super(props)
        this.state = {

            // Master array of all available spaces
            spaces: this.props.spaces,

            // flag to control display of scores
            showScores: false,

            // Search inputs (dropdowns, date/time pickers, checkboxes, textfields)
            rateInput: '',
            capacityInput: '',
            panelExpanded: null,
            filterButtonText: 'Show filters',
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
            showScores: true  //show scores as soon as the user sets any filter
        })

        switch(name) {
            case 'rateInput':
            case 'capacityInput':
            case 'streetInput':
            case 'cityInput':
            case 'quadrantInput':

            // Create a new search object, copying all search criteria from state
            // and then update the object with the search criterion from event.target
            // pass this object (and a reference to all spaces) to weightedScorer

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

            default:
        }
    }

    handleDateChange = date => {
        this.setState({ selectedDate: date })
    }


    // Handle search logic related to the
    // availability of spaces on particular days of the week
    handleDayChange = day => event => {
        // console.log(`'${day}' old status: '${this.state[day]}', new status: '${!this.state[day]}'`)

        // prepare search criteria & collection of spaces for scoring in light
        // of new search criteria
        // (set the clicked day's availability to the opposite of what it currently is...)
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy[day] = !this.state[day]

        // update scores with respect to the latest search criteria
        const newState = weightedScorer(stateCopy)

        // update state with re-scored collection of spaces, which will automatically
        // cause the component to render
        this.setState(prevState => ({
            [day]: !prevState[day],
            showScores: true,  //show scores as soon as the user sets any filter
            spaces: newState.spaces
          }))
        
    }


    handlePanelChange = panel => (event, expanded) => {
        this.setState({
            panelExpanded: expanded ? panel : false,
            filterButtonText: (this.state.filterButtonText === 'Show filters') ? 'Hide filters' : 'Show filters',
        })
    }


    handleClick = event => {
        const { id } = event.currentTarget
        
        // Clear filters button clicked
        // - reset all filter options and inputs
        switch(id) {

        case 'clearFiltersButton':
        this.setState({
            spaces: this.props.spaces,
            showScores: false,  //hide scores
            rateInput: '',
            capacityInput: '',
            // panelExpanded: null, // do NOT hide panel
            filterButtonText: 'Show filters',
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

        case 'toggleFilters':
        // No need to do anything! The panel expansion control is sufficient
        break

        default:
        break
        }
    }
    
    
    render() {
        const { classes } = this.props
        const { filterButtonText, panelExpanded, rateInput, capacityInput, streetInput, cityInput, quadrantInput, monday, tuesday, wednesday, thursday, friday, saturday, sunday} = this.state

        const rateSummaryTxt = {
            Any : "Any",
            0   : "Free",
            25  : "$25 or less",
            50  : "$50 or less",
            75  : "$75 or less",
            100 : "Over $75"
        }
        const capacitySummaryTxt = {
            Any : "Any",
            5   : "1-5",
            10  : "6-10",
            15  : "11-15",
            20  : "Over 15"
        }

        return (
          <React.Fragment>
<div id="testModal" className={classes.modal_DELETE_TO_ACTIVATE}>
            <div className={classes.root}>
                <Paper className={classes.base} elevation={1}>

                    {/* ---  Create Grid  --- */}
                    <Grid container spacing={24}>


                        {/* <Grid item xs={12}>
                        <Typography variant='overline' align='center'>When is the space needed?</Typography>
                        </Grid> */}
                        {/* ----------------------------------------------------- */}
                        {/* Hide filter controls inside an expansion panel */}
                        <ExpansionPanel
                            expanded={panelExpanded === 'filter_panel'}
                            onChange={this.handlePanelChange('filter_panel')}
                            classes={{ root: classes.expansionpanel, }}
                        >
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                {/* <Typography className={classes.heading}>General settings</Typography> */}

                                {/* <Typography className={classes.secondaryHeading}>
                                    <Icon className={classes.leftIcon}>filter_list</Icon>
                                    Show filters
                                    </Typography> */}

                                <Button variant="contained" color="secondary" className={classes.button}
                                style={{width:200}}
                                onClick={this.handleClick}
                                id='toggleFilters'
                                >
                                    <Icon className={classes.leftIcon}>filter_list</Icon>
                                    {filterButtonText}
                                </Button>
 
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                {/* ---  Create Grid  --- */}
                                <Grid container spacing={24}>


                                    {/* ---  Full-width row  --- */}
                                    <Grid item xs={12}>
                                    <Paper elevation={0}
                                    className={classes.filtersummary} 
                                    >
                                        <Typography variant="h6">
                                            Current filters
                                        </Typography>
                                        <Typography component="p">
                                            {(rateInput === '' &&
                                            !capacityInput &&
                                            !streetInput &&
                                            !cityInput &&
                                            !monday &&
                                            !tuesday &&
                                            !wednesday &&
                                            !thursday &&
                                            !friday &&
                                            !saturday &&
                                            !sunday &&
                                            !quadrantInput) ? <em>No filters set</em> : '' }
                                        </Typography>
                                        <Typography component="p">
                                            {rateInput !== '' ? `Rate: ${rateSummaryTxt[rateInput]}` : '' }
                                        </Typography>
                                        <Typography component="p">
                                            {capacityInput ? `Capacity: ${capacitySummaryTxt[capacityInput]}` : '' }
                                        </Typography>
                                        <Typography component="p">
                                            {streetInput ? `Street address: ${streetInput}` : '' }
                                        </Typography>
                                        <Typography component="p">
                                            {cityInput ? `City: ${cityInput}` : '' }
                                        </Typography>
                                        <Typography component="p">
                                            {monday ? 'Mon., ' : ''}
                                            {tuesday ? 'Tues., ' : ''}
                                            {wednesday ? 'Wed., ' : ''}
                                            {thursday ? 'Thurs., ' : ''}
                                            {friday ? 'Fri., ' : ''}
                                            {saturday ? 'Sat., ' : ''}
                                            {sunday ? 'Sun., ' : ''}
                                        </Typography>
                                        <Typography component="p">
                                            {quadrantInput ? `Quadrant: ${quadrantInput}` : ''}
                                        </Typography>
                                    </Paper>
                                    </Grid>

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
                                                <MenuItem value={25}>$25 or less</MenuItem>
                                                <MenuItem value={50}>$50 or less</MenuItem>
                                                <MenuItem value={75}>$75 or less</MenuItem>
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


                                    {/* ---  Full-width row  --- */}
                                    <Grid item xs={12}
                                        style={{
                                            paddingTop:0,
                                        }}
                                    >
                                        <TextField
                                            style={{
                                                width: '180px',
                                                marginTop:0,
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
                                                marginTop:0,
                                            }}
                                            id="city-search-input"
                                            label="City"
                                            className={classes.textField}
                                            name='cityInput'
                                            margin="normal"
                                            onChange={this.handleChange}
                                            value={this.state.cityInput}
                                        />
                                        {(citiesWithQuadrants.includes(this.state.cityInput.toLowerCase())) &&
                                        (<FormControl className={classes.formControl}
                                            style={{
                                                width: '90px',
                                                minWidth: '90px',
                                                marginTop:0,
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


                                    {/* ---  Full-width row  --- */}
                                    <Grid item xs={12}>
                                        <Typography>
                                            <span 
                                            className={classes.dayControl}
                                            style={{color: (monday ? 'white' : 'black'),
                                            backgroundColor: (monday ? '#f50057' : grey[200])}}
                                            id='monCtrl'
                                            onClick={this.handleDayChange('monday')}
                                            >M
                                            </span>
                                            <span 
                                            className={classes.dayControl}
                                            style={{
                                                color: (tuesday ? 'white' : 'black'),
                                                backgroundColor: (tuesday ? '#f50057' : grey[200])}}
                                            id='tueCtrl'
                                            onClick={this.handleDayChange('tuesday')}
                                            >T
                                            </span>
                                            <span 
                                            className={classes.dayControl}
                                            style={{color: (wednesday ? 'white' : 'black'),
                                                backgroundColor: (wednesday ? '#f50057' : grey[200])}}
                                            id='wedCtrl'
                                            onClick={this.handleDayChange('wednesday')}
                                            >W
                                            </span>
                                            <span 
                                            className={classes.dayControl}
                                            style={{color: (thursday ? 'white' : 'black'),
                                                backgroundColor: (thursday ? '#f50057' : grey[200])}}
                                            id='thuCtrl'
                                            onClick={this.handleDayChange('thursday')}
                                            >R
                                            </span>
                                            <span 
                                            className={classes.dayControl}
                                            style={{color: (friday ? 'white' : 'black'),
                                                backgroundColor: (friday ? '#f50057' : grey[200])}}
                                            id='friCtrl'
                                            onClick={this.handleDayChange('friday')}
                                            >F
                                            </span>
                                            <span 
                                            className={classes.dayControl}
                                            style={{color: (saturday ? 'white' : 'black'),
                                                backgroundColor: (saturday ? '#f50057' : grey[200])}}
                                            id='satCtrl'
                                            onClick={this.handleDayChange('saturday')}
                                            >S
                                            </span>
                                            <span 
                                            className={classes.dayControl}
                                            style={{color: (sunday ? 'white' : 'black'),
                                                backgroundColor: (sunday ? '#f50057' : grey[200])}}
                                            id='sunCtrl'
                                            onClick={this.handleDayChange('sunday')} 
                                            >U
                                            </span>
                                        </Typography>
                                    </Grid>


                                    {/* ---  Full-width row  --- */}
                                    <Grid item xs={12}>
                                        <div style={{textAlign: 'center'}}>
                                        <Button variant="contained" color="default"
                                            className={classes.button}
                                            onClick={this.handleClick}
                                            id='clearFiltersButton'
                                        >
                                            <Icon className={classes.leftIcon}>delete</Icon>
                                            Clear filters
                                        </Button>
                                        </div>
                                    </Grid>
                                </Grid>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        {/* ----------------------------------------------------- */}

                        </Grid>
                </Paper>
            </div>
</div>
                <MainGallery
                    onClick={this.props.onClick}
                    spaces={this.state.spaces}
                    className={classes.gallery}
                    showScores={this.state.showScores}
                />
          </React.Fragment>
        )
    }
}
                    

Search.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true })(Search)
