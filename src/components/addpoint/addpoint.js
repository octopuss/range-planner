import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { compose } from 'ramda';
import { connect } from 'react-redux';
import { firebaseConnect, dataToJS, isLoaded } from 'react-redux-firebase'
import { withRouter } from 'react-router';

const AddPoint = props => {

    const { firebase, target, planId, targetId, coords } = props;
    const style = {
        marginRight: 20,
        marginBottom: 20,
        position: 'absolute',
        bottom: 0,
        right: 0,
        zIndex: 1000,
    };
    const targetCoords = !isLoaded(target) ? null: target.coords;
    const _handlePointClick = () => firebase.set('/courses/'+ planId + '/targets/' + targetId + '/coords', targetCoords ? null : coords);

    return (
        <MuiThemeProvider>
            <FloatingActionButton style={style} onClick={_handlePointClick}
                                  secondary={!!targetCoords} >
                {targetCoords ? <ContentRemove/> : <ContentAdd />}
            </FloatingActionButton>
        </MuiThemeProvider>
    )
};

const _mapStateToProps = (state, ownProps) => ({
    planId: ownProps.params.id,
    targetId: dataToJS(state.firebase, 'courses/' + ownProps.params.id + '/selectedTarget'),
    target: dataToJS(state.firebase, 'courses/' + ownProps.params.id + '/targets/' +
        dataToJS(state.firebase, 'courses/' + ownProps.params.id + '/selectedTarget')),
    coords: state.course.coords,
});

export default compose(firebaseConnect(['/courses']), withRouter, connect(_mapStateToProps, null))(
    AddPoint)

