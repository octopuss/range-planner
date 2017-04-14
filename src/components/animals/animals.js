import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Slider from 'react-slick';
import { filter, whereEq, length, pluck, contains, curry, indexOf, map } from 'ramda';
import '../slick.scss';
import './animals.scss';
import { updateTarget } from '../../actions';
import { resolveTarget, commonSettings } from '../../utils';

const Animals = props => {
    const className = 'Animals';

    let settings = commonSettings(className)({
        slidesToShow: Math.min(4, length(props.animals)),
        slidesToScroll: 4,
    });

    const _handleAnimalSelect = curry((id, e) => {
        props.updateTarget(props.target, 'animalId', id);
    });

    const _isUsed = id => contains(id, props.used);

    const itemsList = map(animal => {
        const url = 'http://3dtargets.co.uk/wp-content/uploads/3D-0001-Red-Fox.jpg';
        const opacity = _isUsed(animal.id) ? 0.4 : 1;
        const targetNr = _isUsed(animal.id) ? indexOf(animal.id, props.used) + 1 : null;
        return (<div
            className={animal.number === props.selected ? className + '-Item--active' :
                className + '-Item'} key={className + animal.id}
            onClick={!_isUsed(animal.id) ? _handleAnimalSelect(animal.id) : null } >
            <h3 className={ className + '-Animal'} style={{
                backgroundImage: 'url(' + url + ')',
                backgroundSize: '100% 100%',
                opacity: opacity,
                boxShadow: 'rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px',
            }} >
                {targetNr}
                <p><span className={className + '-AnimalName'} >{animal.name}</span></p>
            </h3>
        </div>);
    });

    return (
        <Slider {...settings}>
            {itemsList(props.animals)}
        </Slider>
    );
};

Animals.PropTypes = {
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
    }),
    animals: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        group: PropTypes.number,
        name: PropTypes.string,
        image: PropTypes.string,
    })),
    used: PropTypes.arrayOf(PropTypes.number),
};

const _filterAnimals = (animals, group) => filter(whereEq({ group: group }))(animals);

const _mapStateToProps = state => ({
    selected: state.plan.selectedAnimal,
    target: resolveTarget(state),
    animals: _filterAnimals(state.animals, state.plan.selectedGroup),
    used: pluck('animalId')(state.targets),
});

const _mapDispatchToProps = dispatch => ({
    updateTarget: bindActionCreators(updateTarget, dispatch),
});

export default connect(_mapStateToProps, _mapDispatchToProps)(Animals);
