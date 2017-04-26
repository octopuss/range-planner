import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {List, ListItem} from 'material-ui/List';
import HardwareKeyboardArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import { withRouter } from 'react-router';
import ContentAdd from 'material-ui/svg-icons/content/add';

const CoursesList = props => {
        const _handleListItemClick = id => () => {
            props.router.push(`/planner/${id}`);
        };

    const _handleAddCourseClick = () => {
        props.router.push(`/new`);
    };

        const items = props.courses.map(
            ({ id, name, targets }) => <ListItem primaryText={name} secondaryText={targets + ' targets'} key={id} onTouchTap={_handleListItemClick(id)} rightIcon={<HardwareKeyboardArrowRight />}/>
        );
    return (<MuiThemeProvider><div>
        <AppBar
            showMenuIconButton={false}
            title="Course planner"
            iconElementRight={<IconButton onTouchTap={_handleAddCourseClick}><ContentAdd /></IconButton>}
        />
        <List>{items}</List>
    </div></MuiThemeProvider>)
};

CoursesList.propTypes = {
    courses: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        email: PropTypes.string
    })),
    router: PropTypes.shape(
        { push: PropTypes.func.isRequired }),
};

const _mapStateToProps = state => ({
   courses : state.courses
});

const _mapDispatchToProps = dispatch => ({
    selectTarget: bindActionCreators(selectTarget, dispatch),
});

export default connect(_mapStateToProps, null)(withRouter(CoursesList));
