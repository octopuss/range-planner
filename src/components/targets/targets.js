import React from 'react';
import Slider from 'react-slick';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { compose, curry, map, keys } from 'ramda';
import { selectTarget } from '../../actions';
import { lightBlue900, lightBlue50, teal900, teal200, fullWhite } from 'material-ui/styles/colors';
import { commonSettings } from '../../utils';
import CircularProgress from 'material-ui/CircularProgress';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
    firebaseConnect,
    dataToJS,
    pathToJS,
    isLoaded,
    isEmpty
} from 'react-redux-firebase'
import '../slick.scss';
import './targets.scss';

const Targets = props => {

    const className = 'Targets';

    const { targets, selected, firebase, planId } = props;

    let settings = commonSettings(className)({
        slidesToShow: 8,
        slidesToScroll: 3,
        useCSS: true,
    });

    const _handleTargetSelect = curry((target, e) => firebase.set('/courses/'+planId+'/selectedTarget', target));

    const doneIcon = selected => (
        <svg fill={selected ? fullWhite : teal200} height="20" width="20" viewBox="0 0 20 25"
             style={{
                 top: '5%',
                 left: '15%',
                 float: 'left',
                 position: 'relative',
                 display: 'block'
             }} >
            <path d="M0 0h20v20H0z" fill="none" />
            <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
        </svg>);

    const items = (targets, selected) => map(key => {
        const { number, coords } = targets[key];
        return (
            <div key={'target' + key} id={key} onClick={_handleTargetSelect(key)}
                 style={{
                     color: selected === key ? fullWhite : teal900,
                     backgroundColor: selected === key ? lightBlue900 : lightBlue50,
                     textAlign: 'center',
                     marginLeft: 5,
                     marginBottom: 3,
                     width: 50,
                     boxShadow: 'rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px'
                 }}
            >
                <div style={{ padding: '10px 0px' }} >{coords ?
                    doneIcon(selected === key) : null}{number}</div>
            </div>)
    })(keys(targets));

    const itemList = (!isLoaded(targets))
        ? 'Loading'
        : (isEmpty(targets))
            ? 'Targets are empty'
            : <Slider {...settings}>{items(targets, selected)}</Slider>;

    return (
        <div>
            {itemList}
        </div>
    );
};

const _mapStateToProps = (state, ownProps) => {
    return {
        planId: ownProps.params.id,
        targets: dataToJS(state.firebase, 'courses/' + ownProps.params.id + '/targets' ),
        selected: dataToJS(state.firebase, 'courses/' + ownProps.params.id + '/selectedTarget' ),
    }
};

const _mapDispatchToProps = dispatch => ({
    selectTarget: bindActionCreators(selectTarget, dispatch),
});

export default compose(withRouter, firebaseConnect(['/courses']), connect(_mapStateToProps, null),)(Targets);
