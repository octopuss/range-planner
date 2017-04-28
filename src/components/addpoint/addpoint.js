import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { resolveTarget } from '../../utils';
import { updateTarget } from '../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const AddPoint = props => {
    const style = {
        marginRight: 20,
        marginBottom: 20,
        position: 'absolute',
        bottom: 0,
        right: 0,
        zIndex: 1000,
    };
    const targetCoords = props.target.coords;
    const _handlePointClick = () => props.updateTarget(props.target, 'coords', targetCoords ? null : props.coords);

    return (
        <MuiThemeProvider>
            <FloatingActionButton style={style} onClick={_handlePointClick} secondary={!!targetCoords}>
                {targetCoords ? <ContentRemove/> : <ContentAdd />}
            </FloatingActionButton>
        </MuiThemeProvider>
    )
};

const _mapStateToProps = state => ({
    target: resolveTarget(state),
    coords: state.course.coords,
});

const _mapDispatchToProps = dispatch => ({
    updateTarget: bindActionCreators(updateTarget, dispatch),
});


export default connect(_mapStateToProps, _mapDispatchToProps)(AddPoint);
