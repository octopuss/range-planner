import React from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import { length, keys, contains, pluck, curry, prop, filter, map, propEq, values } from 'ramda';
import '../slick.scss';
import './animals.scss';
import { commonSettings } from '../../utils';
import { compose } from 'ramda';
import {
    firebaseConnect,
    dataToJS,
    pathToJS,
    isLoaded,
    isEmpty
} from 'react-redux-firebase'
import { withRouter } from 'react-router';

const Animals = props => {
    const className = 'Animals';

    const { animals, targets, targetId, firebase, planId, groupId } = props;

    let settings = commonSettings(className)({
        slidesToShow: 3,
        slidesToScroll: 3,
        variableWidth: true,
    });

    const _handleAnimalSelect = curry((id, e) => {
        firebase.set('/courses/' + planId + '/selectedAnimal', id);
        firebase.set('/courses/' + planId + '/targets/' + targetId + '/animalId', id);
    });

    const items = (animals, targets, groupId) => map(animal => {
        const _isUsed = contains(animal, pluck('animalId')(values(targets)));
        const opacity = _isUsed ? 0.4 : 1;
        const animalTarget = filter(propEq('animalId', animal))(values(targets))[0];
        const targetNr = _isUsed ? animalTarget.number : null;
        return <div
            className={animal.number === props.selected ? className + '-Item--active' :
                className + '-Item'} key={animal}
            onClick={!_isUsed ? _handleAnimalSelect(animal) : null } >
            <h3 className={ className + '-Animal'} style={{
                backgroundImage: 'url(' + animals[animal].image + ')',
                backgroundSize: '100% 100%',
                opacity: opacity,
                boxShadow: 'rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px',
            }} >
                {targetNr}
                <p><span className={className + '-AnimalName'} >{animals[animal].name}</span>
                </p>
            </h3>
        </div>;
    })(keys(filter(propEq('group', groupId), animals)));

    const itemsList = (!isLoaded(animals) || !isLoaded(targets) || !isLoaded(groupId))
        ? 'Loading'
        : <Slider {...settings}>{items(animals, targets, groupId.toString())}</Slider>;

    return (<div>{itemsList}</div>);
};

const _mapStateToProps = (state, ownProps) => {
    return {
        groupId: dataToJS(state.firebase, 'courses/' + ownProps.planId + '/selectedGroup'),
        targetId: dataToJS(state.firebase, 'courses/' + ownProps.planId + '/selectedTarget'),
        targets: dataToJS(state.firebase, 'courses/' + ownProps.planId + '/targets'),
        animals: dataToJS(state.firebase, 'animals'),
    }
};

export default compose(firebaseConnect(['/animals']), connect(_mapStateToProps, null))(
    Animals);
