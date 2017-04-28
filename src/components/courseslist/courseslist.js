import React from 'react';
import { connect } from 'react-redux';
import { compose, length, keys, map } from 'ramda';
import {
    firebaseConnect,
    dataToJS,
    isLoaded,
    isEmpty
} from 'react-redux-firebase'
import { List, ListItem } from 'material-ui/List';
import HardwareKeyboardArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import { withRouter } from 'react-router';
import ContentAdd from 'material-ui/svg-icons/content/add';
import CircularProgress from 'material-ui/CircularProgress';

const CoursesList = props => {
    const _handleListItemClick = id => () => {
        props.router.push(`/planner/${id}`);
    };

    const _handleAddCourseClick = () => {
        props.router.push(`/new`);
    };

    const { courses } = props;

    const items = courses => map(key => {
            const { name, targets } = courses[key];
            return <ListItem primaryText={name} secondaryText={compose(length, keys)(targets) + ' targets'}
                             key={key} onTouchTap={_handleListItemClick(key)}
                             rightIcon={<HardwareKeyboardArrowRight />} />
        }
    )(keys(courses));

    const itemList = (!isLoaded(courses))
        ? <CircularProgress />
        : (isEmpty(courses))
            ? 'Courses is empty'
            : items(courses);

    return (<MuiThemeProvider>
        <div>
            <AppBar
                showMenuIconButton={false}
                title="Course planner"
                iconElementRight={<IconButton
                    onTouchTap={_handleAddCourseClick} ><ContentAdd /></IconButton>}
            />
            <List>{itemList}</List>
        </div>
    </MuiThemeProvider>)
};

const _mapStateToProps = ({ firebase }) => (
    {
        courses: dataToJS(firebase, 'courses'),
    }
);

export default compose(connect(_mapStateToProps, null), firebaseConnect(['/courses']), withRouter)(
    CoursesList)
