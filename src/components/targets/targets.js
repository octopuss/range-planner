import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { length } from 'ramda';
import { selectTarget } from '../../actions';
import { commonSettings } from '../../utils';
import '../slick.scss';
import './targets.scss';

const Targets = props => {

    const className = 'Targets';

    let settings = commonSettings(className)({
        slidesToShow: Math.min(length(props.targets), 7),
        slidesToScroll: 3,
    });

    const _handleTargetSelect = target => () => props.selectTarget(target);

    const itemsList = () => {
        let items = [];
        props.targets.map(target => {
            items.push(<div
                className={target.number === props.selected ? className + '-Item--active' :
                    className + '-Item'} key={className + target.id}
                onClick={_handleTargetSelect(target)} ><h3>{target.number}</h3>
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

Targets.PropTypes = {
    selected: PropTypes.number,
    targets: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        group: PropTypes.number,
        animalId: PropTypes.number,
        number: PropTypes.number,
        lat: PropTypes.number,
        lng: PropTypes.number
    }))
};

const _mapStateToProps = state => ({
    selected: state.plan.selectedTarget,
    targets: state.targets,
});

const _mapDispatchToProps = dispatch => ({
    selectTarget: bindActionCreators(selectTarget, dispatch),
});

export default connect(_mapStateToProps, _mapDispatchToProps)(Targets);
