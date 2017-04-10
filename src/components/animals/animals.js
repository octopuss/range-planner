import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Slider from 'react-slick';
import { filter, whereEq, length, pluck, contains } from 'ramda';
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

    const _handleAnimalSelect = id => () => props.updateTarget(props.target, 'animalId', id);

    const _isUsed = id => contains(id, props.used);

    const itemsList = () => {
        let items = [];
        props.animals.map(animal => {
            items.push(<div
                className={animal.number === props.selected ? className + '-Item--active' :
                    className + '-Item'} key={className + animal.id}
                onClick={_handleAnimalSelect(animal.id)} >
                <h3>{animal.name}</h3>
                <span>{_isUsed(animal.id) ? 'used' : null}</span>
            </div>);
        });
        return items;
    };

    return (
        <Slider {...settings}>
            {itemsList()}
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
        lat: PropTypes.number,
        lng: PropTypes.number
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
