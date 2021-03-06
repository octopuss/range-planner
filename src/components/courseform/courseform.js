import React from 'react';
import { compose, curry } from 'ramda';
import {
    firebaseConnect,
    dataToJS,
    isLoaded,
    isEmpty
} from 'react-redux-firebase'
import { withRouter } from 'react-router';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import Done from 'material-ui/svg-icons/action/done';
import Home from 'material-ui/svg-icons/action/home';
import IconButton from 'material-ui/IconButton';

class CourseForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = { name: '', targets: 28, selectedGroup: 1, selectedAnimal: 1 };
    }

    static divStyle = {
        margin: 12,
    };

    static btnStyle = {
        marginTop: 20,
    };

    _handleSaveClick = () => {
        let fb = this.props.firebase;
        fb.push('/courses', this.state).then((snap) => {
            for (let i = 1; i <= Number(this.state.targets); i++) {
                fb.push('/courses/' + snap.key + '/targets',
                    { number: i, group: 1 }).then(
                    tg => i === 1 ?
                        fb.set('/courses/' + snap.key + '/selectedTarget',
                            tg.key) : null)
            }
            this.props.router.push('/planner/' + snap.key)
        });
    };

    _handleChange = curry((field, e) => this.setState({ [field]: e.target.value }));

    _handleBackClick = () => this.props.router.push('/');

    render() {
        return <MuiThemeProvider>
            <div>
                <AppBar
                    showMenuIconButton={false}
                    title="New Course"
                    iconElementRight={<IconButton
                        onTouchTap={this._handleBackClick} ><Home /></IconButton>}
                />
                <div style={CourseForm.divStyle} >
                    <TextField
                        fullWidth={true}
                        floatingLabelText="Name"
                        onChange={this._handleChange('name')}
                    />
                </div>
                <div style={CourseForm.divStyle} >
                    <TextField
                        fullWidth={true}
                        floatingLabelText="Targets"
                        defaultValue="28"
                        onChange={this._handleChange('targets')}
                    /></div>
                <div style={CourseForm.divStyle} >
                    <RaisedButton label="Save" style={CourseForm.btnStyle} primary={true}
                                  onTouchTap={this._handleSaveClick} fullWidth={true} icon={
                        <Done />} />
                </div>
            </div>
        </MuiThemeProvider>
    };
}

export default compose(firebaseConnect(['/courses']), withRouter)(CourseForm);
