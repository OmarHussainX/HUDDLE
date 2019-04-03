import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Chip from '@material-ui/core/Chip'

const styles = theme => ({
    h5: {
        textShadow: '0px 0px 4px rgba(100,100,100,0.4)',
    },
    card: {
        width: 300,
    },
    cardContent: {
        height: 160,
        overflow: 'hidden',
    },
    media: {
        height: 150,
    },
    scorechip: {
        float:'right',
        fontSize: '1rem',
        borderRadius: '3px',
        // color: 'white',
        textShadow: '0px 0px 3px rgba(125,125,125,0.9)',
        margin: theme.spacing.unit,
    },
})


// https://stackoverflow.com/questions/17525215/calculate-color-values-from-green-to-red
function percentageToHsl(percentage, hue0, hue1) {
    let hue = (percentage * (hue1 - hue0)) + hue0;
    return 'hsl(' + hue + ', 70%, 60%)';
}


class SpaceCard extends Component {
    
    render() {
        const {
            classes,
            id,
            name,
            image,
            rate,
            address,
            capacity,
            venue_type,
            clickHandler,
            score
        } = this.props

        // Determine text and background colour for space's score <Chip>
        const chipText = Math.round(score * 100)
        const chipBackground = percentageToHsl(score, 0, 80)

        return (
            <Card className={classes.card}>
                <CardActionArea onClick={clickHandler} id={'spacecrdindx' + id}>

                    <CardMedia
                        className={classes.media}
                        image={`/images/spaces/${id}/${image}`}
                        title=""
                    />
                    <Chip 
                        label={`${chipText}%`} 
                        className={classes.scorechip} 
                        style={{backgroundColor:chipBackground}}
                    />

                        <CardContent className={classes.cardContent}>
                            <Typography gutterBottom variant="h5" component="h2" className={classes.h5}>
                                {name}
                            </Typography>
                            <Typography gutterBottom>
                                <strong>{rate ? `$${rate}/hr ` : 'FREE '}</strong>
                                <em>{`(Venue type: ${venue_type})`}</em>
                                <br />
                                {`Capacity: ${capacity} `}
                            </Typography>
                            <Typography>
                                {/* {`${address.street} ${address.quadrant}, ${address.postal_code}`} */}
                                {`${address.street} ${address.quadrant}`}
                            </Typography>
                        </CardContent>

                </CardActionArea>
            </Card>
        )
    }
}

SpaceCard.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SpaceCard)
