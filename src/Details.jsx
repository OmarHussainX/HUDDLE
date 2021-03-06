import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import MobileStepper from '@material-ui/core/MobileStepper'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import SwipeableViews from 'react-swipeable-views'
import {autoPlay} from 'react-swipeable-views-utils'
import grey from '@material-ui/core/colors/grey'
import Chip from '@material-ui/core/Chip'
import DetailsTable from './DetailsTable'
import BookSpace from './BookSpace'
import CssBaseline from '@material-ui/core/CssBaseline'
import ScrollUpButton from "./ScrollUpButton"; //Add this line Here


const AutoPlaySwipeableViews = autoPlay(SwipeableViews)
const freeChipColor = grey[200]

const styles = theme => ({
  root: {
    flexGrow: 1,

    // This was creating a gap around the Details view...
    // padding: theme.spacing.unit,
    padding: 0,
  },
  h6: {
    textShadow: '0px 0px 4px rgba(100,100,100,0.3)',
  },
  base: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    [theme.breakpoints.up('md')]: {
      // TABLET
      height: 'calc(100vh - 56px)', // navbar height is 56px
    },
    [theme.breakpoints.up('lg')]: {
      // DESKTOP
      height: 'calc(100vh - 64px)', // navbar height is 64px
    },
  },
  img: {
    height: 255,
    display: 'block',
    maxWidth: 400,
    overflow: 'hidden',
    width: '100%',
  },
  mobileStepper: {
    backgroundColor: 'white',
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
  container: {
    [theme.breakpoints.down('sm')]: {
      // MOBILE
      display: 'flex',
      marginLeft: 'auto',
      marginRight: 'auto',
      flexWrap: 'wrap',
      width: '100vw',
      alignItems: 'stretch',
    },
    [theme.breakpoints.up('md')]: {
      // TABLET
      display: 'flex',
      flexWrap: 'nowrap',
    },
    [theme.breakpoints.up('lg')]: {
      // DESKTOP
      display: 'flex',
      flexWrap: 'nowrap',
    },
  },
  main: {
    order: 1,
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '420px'
  },
  map: {
    order: 2,
    flexBasis: '100%',
    [theme.breakpoints.down('sm')]: {
      // MOBILE
      height: '500px',
    },
  },
})

class Details extends Component {
  constructor() {
    super()
    this.state = {
      activeStep: 0,
    }
  }

  componentDidMount() {
    let latitude = parseFloat(this.props.location.state.selectedSpace.lat)
    let longitude = parseFloat(this.props.location.state.selectedSpace.long)

    if (isNaN(latitude) || isNaN(longitude)) {
      latitude = 37.4220041
      longitude = -122.0862462
    }

    let map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: latitude, lng: longitude},
      zoom: 18,
    })

    let marker = new window.google.maps.Marker({
      position: {lat: latitude, lng: longitude},
      map: map,
      animation: window.google.maps.Animation.DROP,
      title: this.props.location.state.selectedSpace.name,
    })

    marker.setMap(map) //is this needed? Seems OK even without it... :/
  }

  handleNext = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep + 1,
    }))
  }

  handleBack = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep - 1,
    }))
  }

  handleStepChange = activeStep => {
    this.setState({activeStep})
  }

  render() {
    const {classes, theme} = this.props
    const selectedSpace = this.props.location.state.selectedSpace
    const {activeStep} = this.state
    const maxSteps = selectedSpace.img.length

    return (
      <React.Fragment>
        <CssBaseline />
        <ScrollUpButton />
        <div className={classes.root}>
          <div className={classes.container}>
            <main className={classes.main}>
              <Paper className={classes.base} elevation={1}>
                <AutoPlaySwipeableViews
                  axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                  index={activeStep}
                  onChangeIndex={this.handleStepChange}
                  enableMouseEvents>
                  {selectedSpace.img.map((step, index) => (
                    <div key={step}>
                      {Math.abs(activeStep - index) <= 2 ? (
                        <img
                          className={classes.img}
                          src={`/images/spaces/${selectedSpace.id}/${step}`}
                          alt={''}
                        />
                      ) : null}
                    </div>
                  ))}
                </AutoPlaySwipeableViews>

                {/* Do not render carousel controls if there is only one image */}
                {maxSteps > 1 && (
                  <MobileStepper
                    steps={maxSteps}
                    position="static"
                    activeStep={activeStep}
                    className={classes.mobileStepper}
                    nextButton={
                      <Button
                        size="small"
                        onClick={this.handleNext}
                        disabled={activeStep === maxSteps - 1}>
                        Next
                        {theme.direction === 'rtl' ? (
                          <KeyboardArrowLeft />
                        ) : (
                          <KeyboardArrowRight />
                        )}
                      </Button>
                    }
                    backButton={
                      <Button
                        size="small"
                        onClick={this.handleBack}
                        disabled={activeStep === 0}>
                        {theme.direction === 'rtl' ? (
                          <KeyboardArrowRight />
                        ) : (
                          <KeyboardArrowLeft />
                        )}
                        Back
                      </Button>
                    }
                  />
                )}

                <Typography variant="h6" className={classes.h6}>
                  {selectedSpace.name}
                </Typography>

                {selectedSpace.rate === 0 ? (
                  <Chip label="FREE" className={classes.chip} />
                ) : (
                  <Chip
                    label={`$${selectedSpace.rate}/hr `}
                    className={classes.chip}
                  />
                )}

                <Typography gutterBottom>
                  {`Capacity: ${selectedSpace.capacity}`}
                  <em>&nbsp;&nbsp;{`(Venue type: ${selectedSpace.venue_type})`}</em>
                </Typography>

                {/* Booking button - launches booking modal */}
                <div style={{textAlign: 'center', paddingTop: '15px'}}>
                  <BookSpace selectedSpace={selectedSpace} />
                </div>

                <DetailsTable
                  address={selectedSpace.address}
                  link={
                    selectedSpace.contact.website
                      ? selectedSpace.contact.website
                      : ''
                  }
                  phone={selectedSpace.contact.phone}
                  availability={selectedSpace.availability}
                />
                <Typography>{selectedSpace.description}</Typography>
              </Paper>
            </main>
            <div id="map" className={classes.map} />
          </div>
        </div>
      </React.Fragment>
    )
  }
}

Details.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}

export default withStyles(styles, {withTheme: true})(Details)
