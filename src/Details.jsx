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
import green from '@material-ui/core/colors/green';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews)
const freeChipColor = grey[200]

const styles = theme => ({
  root: {
    width: 800,
    flexGrow: 1,

    padding: theme.spacing.unit,
    [theme.breakpoints.down('sm')]: {
      // MOBILE
      backgroundColor: theme.palette.secondary.main,
    },
    [theme.breakpoints.up('md')]: {
      // TABLET
      backgroundColor: theme.palette.primary.main,
    },
    [theme.breakpoints.up('lg')]: {
      // DESKTOP
      backgroundColor: green[500],
    },    
  },
  h6: {
    textShadow: '0px 0px 4px rgba(100,100,100,0.3)',
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
})

class Details extends Component {
  constructor() {
    super()
    this.state = {
      activeStep: 0,
    }
  }

  componentDidMount() {
    let latitude = parseFloat(this.props.selectedSpace.lat)
    let longitude = parseFloat(this.props.selectedSpace.long)

    if (isNaN(latitude) || isNaN(longitude)) {
      latitude = 37.4220041
      longitude = -122.0862462
    }

    let newMap = new window.google.maps.Map(
      document.getElementById('mapTest'),
      {
        center: {lat: latitude, lng: longitude},
        zoom: 15,
      },
    )
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
    const {classes, theme, selectedSpace} = this.props
    const {activeStep} = this.state
    const maxSteps = selectedSpace.img.length

    return (
      <div className={classes.root}>
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
                    src={`/images/${step}`}
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

          <Typography variant="h6" gutterBottom className={classes.h6}>
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

          <Typography>
            {`Capacity: ${selectedSpace.capacity}`}
            <em>&nbsp;&nbsp;(venue type: {selectedSpace.venue_type})</em>
          </Typography>

          <Typography gutterBottom>
            {`${selectedSpace.address.street} ${
              selectedSpace.address.quadrant
            }, ${selectedSpace.address.postal_code}`}
          </Typography>

          <DetailsTable
            address={selectedSpace.address}
            link={'www.need-data.com'}
            phone={selectedSpace.contact.phone}
            availability={selectedSpace.availability}
          />

          <Typography>{selectedSpace.description}</Typography>

          <div
            id="mapTest"
            style={{
              width: '300px',
              height: '300px',
            //   border: '1px solid silver',
              borderRadius: '5px',
              margin: '1em auto',
            }}
          />
        </Paper>
      </div>
    )
  }
}

Details.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}

export default withStyles(styles, {withTheme: true})(Details)
