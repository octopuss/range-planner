import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateTarget, selectGroup } from '../../actions';
import { resolveTarget, commonSettings } from '../../utils';
import '../slick.scss';
import './groups.scss';

const Groups = props => {
    const className = 'Groups';
    const count = 4;

    let settings = commonSettings(className)({
        slidesToShow: 4,
        slidesToScroll: 0,
    });

    const _handleGroupSelect = group => () => {
        props.selectGroup(group);
        props.updateTarget(props.target, 'group', group);
    };

    const itemsList = () => {
        let items = [];
        for (let i = 1; i <= count; i++) {
            items.push(<div
                className={i === props.selected ? className + '-Item--active' : className + '-Item'}
                key={className + i} onClick={_handleGroupSelect(i)} ><h3>{i}</h3></div>);
        }
        return items;
    };
    return (
        <Slider {...settings}>
            {itemsList()}
        </Slider>
    );
};

Groups.PropTypes = {
    selected: PropTypes.number,
    target: PropTypes.shape({
        id: PropTypes.number.isRequired,
        group: PropTypes.number,
        animalId: PropTypes.number,
        number: PropTypes.number,
        lat: PropTypes.number,
        lng: PropTypes.number
    })
};

const _mapStateToProps = state => ({
    selected: state.plan.selectedGroup,
    target: resolveTarget(state)
});

const _mapDispatchToProps = dispatch => ({
    selectGroup: bindActionCreators(selectGroup, dispatch),
    updateTarget: bindActionCreators(updateTarget, dispatch),
});

export default connect(_mapStateToProps, _mapDispatchToProps)(Groups);
