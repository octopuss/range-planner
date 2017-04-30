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

class ImageForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = { image: '' };
    }

    static divStyle = {
        margin: 12,
    };

    static btnStyle = {
        marginTop: 20,
    };

    _handleSaveClick = () => {
        let fb = this.props.firebase;
        fb.push('/images', this.state);
        this.setState({image: ''});
    };

    _handleChange = curry((field, e) => this.setState({ [field]: e.target.value }));

    _handleBackClick = () => this.props.router.push('/');

    render() {
        return <MuiThemeProvider>
            <div>
                <AppBar
                    showMenuIconButton={false}
                    title="New Image"
                    iconElementRight={<IconButton
                        onTouchTap={this._handleBackClick} ><Home /></IconButton>}
                />
                <div style={ImageForm.divStyle} >
                    <TextField
                        fullWidth={true}
                        floatingLabelText="Image"
                        onChange={this._handleChange('image')}
                    />
                </div>
                <div style={ImageForm.divStyle} >
                    <RaisedButton label="Save" style={ImageForm.btnStyle} primary={true}
                                  onTouchTap={this._handleSaveClick} fullWidth={true} icon={
                        <Done />} />
                </div>
            </div>
        </MuiThemeProvider>
    };
}

export default compose(firebaseConnect(['/courses']), withRouter)(ImageForm);
