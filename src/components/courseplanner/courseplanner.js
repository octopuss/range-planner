import React from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/MenuItem';
import { Groups, Targets, Animals, Map, AddPoint } from '../../components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Done from 'material-ui/svg-icons/action/done';
import Delete from 'material-ui/svg-icons/action/delete';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import Divider from 'material-ui/Divider';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
injectTapEventPlugin();

class MenuBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { open: false };
    }

    _handleBackClick = () => {
        this.props.router.push('/');
    };

    handleOpen = () => this.setState({ open: true });

    handleClose = action => () => this.setState({ open: false }, action);

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
        const dialog = <Dialog
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose(this.props.onCancel)}
        >
            Do you really want to delete this course ?
        </Dialog>;
        return (<MuiThemeProvider>
            <div>
                <AppBar
                    showMenuIconButton={false}
                    title={this.props.competition}
                    iconElementRight={ <IconMenu
                        iconButtonElement={
                            <IconButton><MoreVertIcon /></IconButton>
                        }
                        anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
                        targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                    >
                        <MenuItem primaryText="Save" leftIcon={<Done />} />
                        <MenuItem primaryText="Back" leftIcon={<ArrowBack/>}
                                  onTouchTap={this._handleBackClick} />
                        <Divider />
                        <MenuItem primaryText="Remove" leftIcon={<Delete/>}
                                  onTouchTap={this.handleOpen} />
                    </IconMenu>}
                />
                {dialog}
            </div>
        </MuiThemeProvider>);
    }
}

const CoursePlanner = props => {

    return (
        <div>
            <MenuBar  {...props} />
            <Targets />
            <Groups />
            <div style={{ clear: 'both' }} />
            <Animals />
            <Map />
            <AddPoint />
        </div>
    );
};

CoursePlanner.PropTypes = {
    router: PropTypes.shape(
        { push: PropTypes.func.isRequired }),
};

const _mapStateToProps = state => ({
    competition: state.course.name,
});

const _mapDispatchToProps = dispatch => ({});
export default connect(_mapStateToProps, _mapDispatchToProps)(withRouter(CoursePlanner));
