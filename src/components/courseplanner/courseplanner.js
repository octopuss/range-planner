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
import Home from 'material-ui/svg-icons/action/home';
import { red500 } from 'material-ui/styles/colors';
injectTapEventPlugin();

const CoursePlanner = props => {
    const _handleBackClick = () => {
        props.router.push('/');
    };
    return (
        <div>
            <MuiThemeProvider>
                <AppBar
                    showMenuIconButton={false}
                    title={props.competition}
                    iconElementRight={ <IconMenu
                        iconButtonElement={
                            <IconButton><MoreVertIcon /></IconButton>
                        }
                        anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
                        targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                    >
                        <MenuItem primaryText="Save" leftIcon={<Done />} />
                        <MenuItem primaryText="Delete" leftIcon={<Delete color={red500}/>} />
                        <MenuItem primaryText="Back" leftIcon={<Home/>} onClick={_handleBackClick} />
                    </IconMenu>}
                />
            </MuiThemeProvider>
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
