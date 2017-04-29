import React from 'react';
import { connect } from 'react-redux';
import { curry, map, compose } from 'ramda';
import {
    green600,
    blue600,
    orange600,
    cyan600,
    teal900,
    fullWhite,
    lime100
} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import { firebaseConnect, dataToJS } from 'react-redux-firebase'
import { withRouter } from 'react-router';

const Groups = props => {

    const { selected, firebase, planId, target } = props;

    const _handleGroupSelect = curry((group, e) => {
        firebase.set('/courses/' + planId + '/selectedGroup', group);
        firebase.set('/courses/' + planId + '/targets/' + target + '/group', group);
    });
    const colors = [green600, blue600, orange600, cyan600];

    const itemsList = map(i => (
        <RaisedButton key={'group' + i} style={{ margin: 5, minWidth: 80, maxWidth: '24vw' }}
                      onClick={_handleGroupSelect(i)}
                      labelColor={selected === i ? fullWhite : teal900}
                      backgroundColor={selected === i ? colors[i - 1] : lime100}
                      label={i} ></RaisedButton>))([1, 2, 3, 4]);

    return (<MuiThemeProvider>
        <div>{itemsList}</div>
    </MuiThemeProvider>);

};

const _mapStateToProps = (state, ownProps) => {
    return {
        selected: dataToJS(state.firebase, 'courses/' + ownProps.planId + '/selectedGroup'),
        target: dataToJS(state.firebase, 'courses/' + ownProps.planId + '/selectedTarget'),
    }
};

export default compose(firebaseConnect(props =>  ['/courses/' + props.planId]), withRouter, connect(_mapStateToProps, null))(
    Groups)
