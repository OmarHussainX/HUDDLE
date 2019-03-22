import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Chip from '@material-ui/core/Chip'


const styles = {
  card: {
    maxWidth: 300,
    minWidth: 300,
  },
  cardContent: {
    minHeight: 150,
  },
  media: {
    minHeight: 150,
    maxHeight: 150,
  },
  chip: {
    cursor: 'pointer',
    padding: '1px',
  },
}

class SpaceCard extends Component {
    render() {
        const { classes } = this.props
        return (
            <Card className={classes.card}>
            <CardActionArea onClick={this.props.clickHandler} id={'spacecrdindx'+this.props.id}>

                <CardMedia
                className={classes.media}
                image={`/images/${this.props.image}`}
                title=""
                />

                <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                    {this.props.name}
                </Typography>
                <Typography>
                  {this.props.rate === 0 ? <Chip label="FREE" className={classes.chip}/> : `$${this.props.rate}/hr`}
                  {`Capacity: ${this.props.capacity}`}
                  {`Type: ${this.props.venue_type}`}
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
