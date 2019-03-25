import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
// import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import LinkTag from '@material-ui/core/Link';
// import Paper from '@material-ui/core/Paper'
import { Place, Link, LocalPhone,  } from '@material-ui/icons'

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2,
        overflowX: 'auto',
    },
    table: {
        padding: 'none',
    },
    tablerow: {
        height: 'auto',
    },
    tablecell: {
        border: 'none',
        paddingRight: '4px',
        paddingLeft: '4px',
        // verticalAlign: 'bottom',
    },
})


class DetailsTable extends Component {
    render(props) {

    
        const { classes, address, link, phone, availability } = this.props

        let tableRows = []
        for(const day in availability) {
            tableRows.push(
            <TableRow className={classes.tablerow} key={`${day}indx${tableRows.length}`}>
                <TableCell className={classes.tablecell}></TableCell>
                <TableCell className={classes.tablecell} align="left" width="90px">{ availability[day] ? day: <span style={{color:'grey'}}>{day}</span> }</TableCell>
                <TableCell className={classes.tablecell} align="left">{ availability[day] ? '9 am - 5 pm' : <em style={{color:'grey'}}>Unavailable</em>}</TableCell>
            </TableRow>
            )
        }

        return (
            <div className={classes.root}>
                <Table className={classes.table}>
                    <TableBody>
                        <TableRow className={classes.tablerow}>
                            <TableCell className={classes.tablecell} align="left" width="16px">
                                <Place color="primary">icon</Place>
                            </TableCell>
                            <TableCell className={classes.tablecell} colSpan="2">{`${address.street} ${address.quadrant}, ${address.postal_code}`}</TableCell>
                        </TableRow>
                        <TableRow className={classes.tablerow}>
                            <TableCell className={classes.tablecell} align="left" width="16px">
                                <Link color="primary">icon</Link>
                            </TableCell>
                            <TableCell className={classes.tablecell} colSpan="2">
                                <LinkTag href={link} color="primary">
                                    {link}
                                </LinkTag>
                            </TableCell>
                        </TableRow>
                        <TableRow className={classes.tablerow}>
                            <TableCell className={classes.tablecell} align="left" width="16px">
                                <LocalPhone color="primary">icon</LocalPhone>
                            </TableCell>
                            <TableCell className={classes.tablecell} colSpan="2">{phone}</TableCell>
                        </TableRow>
                        {tableRows}
                    </TableBody>
                </Table>
            </div>
        )
    }
}
DetailsTable.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(DetailsTable)