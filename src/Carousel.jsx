import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import MobileStepper from '@material-ui/core/MobileStepper'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import SwipeableViews from 'react-swipeable-views'
import { autoPlay } from 'react-swipeable-views-utils'
import blue from '@material-ui/core/colors/blue';
import Chip from '@material-ui/core/Chip'

const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

const freeChipColor = blue[500]

const styles = theme => ({
  root: {
    maxWidth: 400,
    flexGrow: 1,
  },
  base: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    minHeight: '400px',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing.unit * 4,
    backgroundColor: theme.palette.background.default,
  },
  img: {
    height: 255,
    display: 'block',
    maxWidth: 400,
    overflow: 'hidden',
    width: '100%',
  },
  chip: {
    backgroundColor: freeChipColor,
    // borderRadius: '5px',
    // lineHeight: '0.5em',
    // fontWeight: 'bold',
    color: 'white',
    padding: '1px',
    marginRight: '10px',
  },
})

class Carousel extends React.Component {
  state = {
    activeStep: 0,
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
    this.setState({ activeStep })
  }

  render() {
    const { classes, theme, selectedSpace } = this.props
    const { activeStep } = this.state
    const maxSteps = selectedSpace.img.length

    return (
      <div className={classes.root}>
        <Paper className={classes.base} elevation={1}>
            <Paper square elevation={0} className={classes.header}>
            <Typography>{selectedSpace.name}</Typography>
            </Paper>
            <AutoPlaySwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={activeStep}
            onChangeIndex={this.handleStepChange}
            enableMouseEvents
            >
            {selectedSpace.img.map((step, index) => (
                <div key={step}>
                {Math.abs(activeStep - index) <= 2 ? (
                    <img className={classes.img} src={`/images/${step}`} alt={""} />
                ) : null}
                </div>
            ))}
            </AutoPlaySwipeableViews>

            {/* Do not render carousel controls if there is only one image */}
            { maxSteps > 1 && (
                <MobileStepper
                    steps={maxSteps}
                    position="static"
                    activeStep={activeStep}
                    className={classes.mobileStepper}
                    nextButton={
                        <Button size="small" onClick={this.handleNext} disabled={activeStep === maxSteps - 1}>
                            Next
                            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                        </Button>
                    }
                    backButton={
                        <Button size="small" onClick={this.handleBack} disabled={activeStep === 0}>
                            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                            Back
                        </Button>
                    }
                />
            )}
            <Typography>
                {selectedSpace.rate === 0 ? <Chip label="FREE" className={classes.chip} /> : `$${selectedSpace.rate}/hr `}
            </Typography>
            <Typography>
                {`Capacity: ${selectedSpace.capacity}`} 
                <em>&nbsp;&nbsp;(venue type: {selectedSpace.venue_type})</em>
            </Typography>
            <Typography gutterBottom>
                {`${selectedSpace.address.street} ${selectedSpace.address.quadrant}, ${selectedSpace.address.postal_code}`}
            </Typography>
            <Typography>
            {selectedSpace.description}
            </Typography>
        </Paper>
      </div>
    )
  }
}

Carousel.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true })(Carousel)
