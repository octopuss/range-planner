import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { curry, map } from 'ramda';
import { bindActionCreators } from 'redux';
import { updateTarget, selectGroup } from '../../actions';
import { fullWhite, lightGreenA700, teal900, lime100 } from 'material-ui/styles/colors';
import { resolveTarget } from '../../utils';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

const Groups = props => {
    const _handleGroupSelect = curry((group, e) => {
        props.selectGroup(group);
        props.updateTarget(props.target, 'group', group);
    });

    const itemsList = map(i => (
        <RaisedButton key={'group' + i} style={{ margin: 5, minWidth: 80, maxWidth: '24vw'}}
                      onClick={_handleGroupSelect(i)}
                      labelColor={props.selected === i ? fullWhite : teal900}
                      backgroundColor={props.selected === i ? lightGreenA700 : lime100}
                      label={i} ></RaisedButton>))([1, 2, 3, 4]);

    return (<MuiThemeProvider>
        <div>{itemsList}</div>
    </MuiThemeProvider>);

};

const _mapStateToProps = state => ({
    selected: state.plan.selectedGroup,
    target: resolveTarget(state)
});

const _mapDispatchToProps = dispatch => ({
    selectGroup: bindActionCreators(selectGroup, dispatch),
    updateTarget: bindActionCreators(updateTarget, dispatch),
});

Groups.PropTypes = {
    selected: PropTypes.number,
    target: PropTypes.shape({
        id: PropTypes.number.isRequired,
        group: PropTypes.number,
        animalId: PropTypes.number,
        number: PropTypes.number,
        coords: PropTypes.shape({
            lat: PropTypes.number,
            lng: PropTypes.number
        }),
    })
};

export default connect(_mapStateToProps, _mapDispatchToProps)(Groups);
