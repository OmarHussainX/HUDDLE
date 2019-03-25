import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        // minWidth: 700,
        padding: 'none',
    },
    tablerow: {
        height: 'auto',
    },
    tablecell: {
        border: 'none',
        paddingRight: '4px',
        paddingLeft: '4px',
    },
})


function AvailabilityTable(props) {
    const { classes, availability } = props

    let tableRows = []
    for(const day in availability) {
        tableRows.push(
        <TableRow className={classes.tablerow} key={`${day}indx${tableRows.length}`}>
            <TableCell className={classes.tablecell} align="right" width="100px">{day}</TableCell>
            <TableCell className={classes.tablecell} align="left">{ availability[day] ? '9 am - 5 pm' : <em>unavailable</em>}</TableCell>
        </TableRow>
        )
    }

    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableBody>
                    {tableRows}
                </TableBody>
            </Table>
        </Paper>
    )
}

AvailabilityTable.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(AvailabilityTable)