import React from 'react';
import { connect } from 'react-redux';
import { keys, curry, map } from 'ramda';
import { compose } from 'ramda';
import {
    firebaseConnect,
    dataToJS,
    pathToJS,
    isLoaded,
    isEmpty
} from 'react-redux-firebase'
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const AnimalsList = props => {

    const { animals, firebase } = props;

    const _handleChange = curry(
        (field, animal, e) => firebase.set('/animals/' + animal + '/' + field, e.target.value))

    const items = (animals) => map(animal => {
        return <div key={animal} style={{width: '100%', float: 'left', borderBottom: '2px solid grey', marginBottom: '5px'}}>
            <div style={{float: 'left', width: '500px'}}><img src={animals[animal].image} height={125}/></div>
            <div style={{float: 'left'}}><TextField
                fullWidth={true}
                floatingLabelText="Group"
                value={animals[animal].group}
                onChange={_handleChange('group', animal)}
            /><TextField
                fullWidth={true}
                floatingLabelText="Name"
                value={animals[animal].name}
                onChange={_handleChange('name', animal)}
            /></div>
        </div>;
    })(keys(animals));

    const itemsList = (!isLoaded(animals))
        ? 'Loading'
        : <div>{items(animals)}</div>;

    return (<MuiThemeProvider><div>{itemsList}</div></MuiThemeProvider>);
};

const _mapStateToProps = (state) => {
    return {
        animals: dataToJS(state.firebase, 'animals'),
    }
};

export default compose(firebaseConnect(['/animals']), connect(_mapStateToProps, null))(
    AnimalsList);
