import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/MenuItem';
import { Groups, Targets, Animals, Map, AddPoint } from '../../components';
import { connect } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const NgView = props => {
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
                        <MenuItem primaryText="Save" />
                        <MenuItem primaryText="Back" />
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
}

const _mapStateToProps = state => ({
    competition: state.course.name,
});

const _mapDispatchToProps = dispatch => ({});
export default connect(_mapStateToProps, _mapDispatchToProps)(NgView);
