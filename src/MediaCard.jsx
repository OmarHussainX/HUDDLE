import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const styles = {
  card: {
    maxWidth: 300,
  },
  media: {
    height: 150,
  },
}

class MediaCard extends Component {
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
                <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {this.props.name}
                </Typography>
                <Typography gutterBottom component="p">
                    {(this.props.info.length >= 120 ? this.props.info.substring(0,120)+'...' : this.props.info)} 
                </Typography>
                <Typography component="p">
                    Latitude: {this.props.lat}, Longtitude: {this.props.long}
                </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button 
                    size="small" 
                    color="primary" 
                    onClick={this.props.clickHandler}
                    id={'spacebtnindx'+this.props.id}
                    >See details
                </Button>
            </CardActions>
            </Card>
        )
    }
}

MediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(MediaCard)