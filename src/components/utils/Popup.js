import React, { Component } from 'react';
import {Dialog, DialogTitle, DialogActions, DialogContent, Button} from 'react-mdl';

class Popup extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
  }

  handleOpenDialog() {
    this.setState({
      openDialog: true
    });
  }

  handleCloseDialog() {
    this.setState({
      openDialog: false
    });
  }

  render() {
    return (
      <div>
        <Button id="popup-trigger" style={{display: "none"}} onClick={this.handleOpenDialog}></Button>
        <Dialog open={this.state.openDialog}>
          <DialogTitle>{this.props.title}</DialogTitle>
          <DialogContent>
            <this.props.body />
          </DialogContent>
          <DialogActions>
            <Button type='button'>{this.props.actionName}</Button>
            <Button id="popup-close" type='button' onClick={this.handleCloseDialog}>Close</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default Popup;