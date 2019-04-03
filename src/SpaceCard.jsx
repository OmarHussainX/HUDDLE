import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Chip from '@material-ui/core/Chip'
import grey from '@material-ui/core/colors/grey'
import { relative } from 'path'

const styles = theme => ({
    spacename: {
        // textShadow: '0px 0px 2px rgba(100,100,100,0.3)',
        marginBottom: '4px'
    },
    card: {
        width: 300,
    },
    cardContent: {
        height: 160,
        overflow: 'hidden',
        paddingTop: '8px',  //default 16px
    },
    media: {
        height: 150,
    },
    scorechip: {
        position: 'absolute',
        right: '0px',
        top: '0px',
        fontSize: '1rem',
        borderRadius: '3px',
        // color: 'white',
        textShadow: '0px 0px 3px rgba(125,125,125,0.9)',
        margin: theme.spacing.unit,
    },
    availability: {
        display: 'inline-block',
        width: '20px',
        minWidth: '20px',
        padding:'3px',
        marginRight: '2px',
        // border: '1px dotted silver',
        borderRadius: '3px',
        backgroundColor: grey[200],
        textAlign: 'center',
    }
})


// https://stackoverflow.com/questions/17525215/calculate-color-values-from-green-to-red
function percentageToHsl(percentage, hue0, hue1, sat, bright) {
    let hue = (percentage * (hue1 - hue0)) + hue0
    return `hsl(${hue}, ${sat}%, ${bright}%)`
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
            availability,
            venue_type,
            clickHandler,
            score
        } = this.props

        // Determine text and background colour for space's score <Chip>
        const chipText = Math.round(score * 100)
        const chipBackground = percentageToHsl(score, 0, 80, 70, 60)
        const chipBorder = percentageToHsl(score, 0, 80, 70, 40)

        return (
            <Card className={classes.card}>
                <CardActionArea onClick={clickHandler} id={'spacecrdindx' + id}>

                    <CardMedia
                        className={classes.media}
                        image={`/images/spaces/${id}/${image}`}
                        title=""
                    />
                    <div style={{position:relative}}>
                    <Chip 
                        label={`${chipText}%`} 
                        className={classes.scorechip} 
                        style={{backgroundColor:chipBackground, border: `1px solid ${chipBorder}`}}
                    />
                    </div>

                        <CardContent className={classes.cardContent}>
                            <Typography gutterBottom variant="h6" className={classes.spacename}>
                                {(name.length >= 25 ? name.substring(0,22)+'...' : name)} 
                            </Typography>
                            <Typography gutterBottom>
                                {`${address.street} ${address.quadrant},  ${address.city}`}
                            </Typography>
                            <Typography gutterBottom>
                                <strong>{rate ? `$${rate}/hr ` : 'FREE '}</strong>
                                <em>{`(Venue type: ${venue_type})`}</em>
                                <br />
                                {`Capacity: ${capacity} `}
                            </Typography>
                            <Typography>
                                <span 
                                className={classes.availability}
                                style={{color: (availability.monday ? 'black' : 'silver')}}
                                >M
                                </span>
                                <span 
                                className={classes.availability}
                                style={{color: (availability.tuesday ? 'black' : 'silver')}}
                                >T
                                </span>
                                <span 
                                className={classes.availability}
                                style={{color: (availability.wednesday ? 'black' : 'silver')}}
                                >W
                                </span>
                                <span 
                                className={classes.availability}
                                style={{color: (availability.thursday ? 'black' : 'silver')}}
                                >R
                                </span>
                                <span 
                                className={classes.availability}
                                style={{color: (availability.friday ? 'black' : 'silver')}}
                                >F
                                </span>
                                <span 
                                className={classes.availability}
                                style={{color: (availability.saturday ? 'black' : 'silver')}}
                                >S
                                </span>
                                <span 
                                className={classes.availability}
                                style={{color: (availability.sunday ? 'black' : 'silver')}}
                                >U
                                </span>
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
