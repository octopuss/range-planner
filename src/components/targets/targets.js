import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { length, curry, map } from 'ramda';
import { selectTarget } from '../../actions';
import { lightBlue900, lightBlue50, teal900, fullWhite, lime300 } from 'material-ui/styles/colors';
import { commonSettings } from '../../utils';
import '../slick.scss';
import './targets.scss';

const Targets = props => {

    const className = 'Targets';

    let settings = commonSettings(className)({
        slidesToShow: 8,
        slidesToScroll: 3,
        useCSS: true,
    });

    const _handleTargetSelect = curry((target, e) => props.selectTarget(target));

    const itemsList = map(target => (
        <div key={'target' + target.id} onClick={_handleTargetSelect(target)}
             style={{
                 color: props.selected === target.number ? fullWhite : teal900,
                 backgroundColor: props.selected === target.number ? lightBlue900 : (target.coords ? lime300
                     : lightBlue50),
                 textAlign: 'center',
                 marginLeft: 5,
                 marginBottom: 3,
                 width: 50,
                 boxShadow: 'rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px'
             }}
        ><div style={{padding: '10px 0px'}}>{target.number}</div></div>));
    return (
        <Slider {...settings}>
            {itemsList(props.targets)}
        </Slider>
        );
        };

Targets.propTypes = {
    selected: PropTypes.number,
    targets: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        group: PropTypes.number,
        animalId: PropTypes.number,
        number: PropTypes.number,
        coords: PropTypes.shape({
            lat: PropTypes.number,
            lng: PropTypes.number
        }),
    })),
    selectTarget: PropTypes.func,
};

const _mapStateToProps = state => ({
    selected: state.plan.selectedTarget,
    targets: state.targets,
});

const _mapDispatchToProps = dispatch => ({
    selectTarget: bindActionCreators(selectTarget, dispatch),
});

export default connect(_mapStateToProps, _mapDispatchToProps)(Targets);
