import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Badge from '@material-ui/core/Badge'
// import Chip from '@material-ui/core/Chip'

const styles = theme => ({
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
    chip: {
        // cursor: 'pointer',
        float: 'right',
        // padding: '1px',
    },
    freeBadge: {
        left: 0,
        right: 'auto',
        borderRadius: '3px',
    },
})

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
        } = this.props

        const badgeText = (rate === 0) ? 'FREE' : 0

        return (
            <Card className={classes.card}>
                <CardActionArea onClick={clickHandler} id={'spacecrdindx' + id}>

                    <CardMedia
                        className={classes.media}
                        image={`/images/${image}`}
                        title=""
                    />

                    <Badge classes={{ badge: classes.freeBadge }} badgeContent={badgeText} color="primary">
                        <CardContent className={classes.cardContent}>
                            {/* {rate === 0 ? <Chip label="FREE" className={classes.chip} /> : ''} */}
                            <Typography gutterBottom variant="h5" component="h2">
                                {name}
                            </Typography>
                            <Typography gutterBottom>
                                <strong>{rate ? `$${rate}/hr ` : ''}</strong>
                                <em>{`(Venue type: ${venue_type})`}</em>
                                <br />
                                {`Capacity: ${capacity} `}
                            </Typography>
                            <Typography>
                                {/* {`${address.street} ${address.quadrant}, ${address.postal_code}`} */}
                                {`${address.street} ${address.quadrant}`}
                            </Typography>
                        </CardContent>
                    </Badge>

                </CardActionArea>
            </Card>
        )
    }
}

SpaceCard.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SpaceCard)
