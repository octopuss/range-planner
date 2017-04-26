import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import Done from 'material-ui/svg-icons/action/done';
import Home from 'material-ui/svg-icons/action/home';
import IconButton from 'material-ui/IconButton';

const CourseForm = props => {
    const divStyle = {
        margin: 12,
    };

    const btnStyle = {
        marginTop: 20,
    };

    const _handleSaveClick = () => {
        props.router.push('/planner');
    };

    const _handleBackClick = () => {
        props.router.push('/');
    };


    return (
        <MuiThemeProvider>
            <div>
                <AppBar
                    showMenuIconButton={false}
                    title="New Course"
                    iconElementRight={<IconButton onTouchTap={_handleBackClick}><Home /></IconButton>}
                />
                <div style={divStyle}>
                    <TextField
                        fullWidth={true}
                        floatingLabelText="Name"
                    />
                </div>
                <div style={divStyle}>
                    <TextField
                        fullWidth={true}
                        floatingLabelText="Targets"
                        defaultValue="28"
                    /></div>
                <div style={divStyle}>
                    <RaisedButton label="Save" style={btnStyle} primary={true} onTouchTap={_handleSaveClick} fullWidth={true} icon={<Done />} />
                </div>
            </div>
        </MuiThemeProvider>
    );
};

CourseForm.PropTypes = {
    router: PropTypes.shape(
        { push: PropTypes.func.isRequired }),
};


export default withRouter(CourseForm);
