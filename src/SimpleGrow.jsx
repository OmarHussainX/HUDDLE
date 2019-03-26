import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';
import {Grid} from '@material-ui/core'
import SpaceCard from './SpaceCard'
import spacesData from './spaces.json'

const styles = theme => ({
  root: {
    height: 180,
  },
  container: {
    display: 'flex',
  },
  paper: {
    margin: theme.spacing.unit,
  },
  svg: {
    width: 100,
    height: 100,
  },
  polygon: {
    fill: theme.palette.common.white,
    stroke: theme.palette.divider,
    strokeWidth: 1,
  },
});

class SimpleGrow extends React.Component {
  state = {
    checked: true,
  };

  handleChange = () => {
    this.setState(state => ({ checked: !state.checked }));
  };

  render() {
    const { classes } = this.props;
    const { checked } = this.state;

    const polygon = (
      <Paper elevation={4} className={classes.paper}>
        <svg className={classes.svg}>
          <polygon points="0,50 50,00, 50,50" className={classes.polygon} />
        </svg>
      </Paper>
    );

    let spaceCards = []
    spacesData.forEach(space => {
      spaceCards.push(
        <Grid item key={space.id}>
          <SpaceCard
            id={space.id}
            name={space.name}
            image={space.img[0]}
            rate={space.rate}
            address={space.address}
            capacity={space.capacity}
            venue_type={space.venue_type}
            clickHandler={this.clickHandler}
          />
        </Grid>,
      )
    })

    return (
      <div className={classes.root}>
        <Switch checked={checked} onChange={this.handleChange} aria-label="Collapse" />
        <div className={classes.container}>
          <Grow in={checked}>{spaceCards[0]}</Grow>
          {/* Conditionally applies the timeout property to change the entry speed. */}
          <Grow
            in={checked}
            style={{ transformOrigin: '0 0 0' }}
            {...(checked ? { timeout: 1000 } : {})}
          >
            {spaceCards[1]}
          </Grow>
          <Grow
            in={checked}
            style={{ transformOrigin: '0 0 0' }}
            {...(checked ? { timeout: 1000 } : {})}
          >
            {spaceCards[2]}
          </Grow>
          <Grow
            in={checked}
            style={{ transformOrigin: '0 0 0' }}
            {...(checked ? { timeout: 1000 } : {})}
          >
            {spaceCards[3]}
          </Grow>
          <Grow
            in={checked}
            style={{ transformOrigin: '0 0 0' }}
            {...(checked ? { timeout: 1000 } : {})}
          >
            {spaceCards[4]}
          </Grow>
          <Grow
            in={checked}
            style={{ transformOrigin: '0 0 0' }}
            {...(checked ? { timeout: 1000 } : {})}
          >
            {spaceCards[5]}
          </Grow>
          <Grow
            in={checked}
            style={{ transformOrigin: '0 0 0' }}
            {...(checked ? { timeout: 1000 } : {})}
          >
            {spaceCards[6]}
          </Grow>
        </div>
      </div>
    );
  }
}

SimpleGrow.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleGrow);

