import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

class BookConfirm extends React.Component {
    constructor() {
        super()
        this.state = {
            open: false,
        }
    }


  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    // close this modal
    this.setState({ open: false })

    //close parent modal
    this.props.closeParent()
  }

    render() {

        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                    Submit request
        </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    // onClose={closeParentModal}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{`Thank you ${this.props.username}`}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Your booking request has been sent!
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button 
                        color="primary" 
                        autoFocus
                        onClick={this.handleClose}
                        // onClick={closeParentModal} 
                        >
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default BookConfirm