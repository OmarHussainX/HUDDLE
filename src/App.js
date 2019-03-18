import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline'
import { 
    Grid,
    Typography,
    Card,
    Button
} from '@material-ui/core'
// import './App.css'
import MediaCard from './MediaCard'
import MapCard from './MapCard'
import {places} from './places'


const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    // paper: {
    //     height: 140,
    //     width: 100,
    // },
    // control: {
    //     padding: theme.spacing.unit * 2,
    // },
})


class App extends Component {
    
    
    clickHandler = (event) => {
        console.log('inside clickHandler')
        console.log(event.target)
        console.log(event.currentTarget)

    }


    render() {
        const { classes } = this.props

        let placeCards = []
        places.forEach(place => {
            placeCards.push(
                <Grid item key={place.id}>
                    <MediaCard 
                        name={place.name}
                        image={place.image}
                        info={place.info}
                        lat={place.lat}
                        long={place.long}
                        clickHandler={this.clickHandler}
                    />
                </Grid>
                )
        })

        return (
            <React.Fragment>
                <CssBaseline />
                <Typography variant='h3' align='center' gutterBottom>
                    HUDDLE
                </Typography>
                <Grid container className={classes.root} justify="center" spacing={32}>
                {placeCards}
                <MapCard />
                </Grid>
            </React.Fragment >
        )
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
}
  
export default withStyles(styles)(App)

