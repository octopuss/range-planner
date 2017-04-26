import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class AlertDialog extends React.Component {

    constructor(props) {
        super(props);
        this.props = props;
    }

    state = {
        open: false,
    };

    handleOpen = () => this.setState({open: true});

    handleClose = action => () => this.setState({open: false}, action);

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={false}
                onTouchTap={this.handleClose(this.props.onCancel)}
            />,
            <FlatButton
                label="Ok"
                primary={true}
                onTouchTap={this.handleClose(this.props.onOk)}
            />,
        ];

        return (
            <MuiThemeProvider>
            <div>
                <Dialog
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose(this.props.onCancel)}
                >
                    {this.props.text}
                </Dialog>
            </div>
            </MuiThemeProvider>
        );
    }
}

AlertDialog.PropTypes = {
    text : PropTypes.string,
    onCancel: PropTypes.func,
    onOk: PropTypes.func,
};


export default AlertDialog;
