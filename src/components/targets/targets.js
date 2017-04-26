import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { length, curry, map } from 'ramda';
import { selectTarget } from '../../actions';
import { lightBlue900, lightBlue50, teal900, teal200, fullWhite } from 'material-ui/styles/colors';
import { commonSettings, targetShape } from '../../utils';
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

    const doneIcon = selected => (<svg fill={selected ? fullWhite : teal200} height="20" width="20" viewBox="0 0 20 25" style={{top: '5%', left: '15%', float: 'left', position: 'relative', display: 'block'}}>
        <path d="M0 0h20v20H0z" fill="none"/>
        <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
    </svg>);

    const itemsList = map(target => (
        <div key={'target' + target.id} onClick={_handleTargetSelect(target)}
             style={{
                 color: props.selected === target.number ? fullWhite : teal900,
                 backgroundColor: props.selected === target.number ? lightBlue900 : lightBlue50,
                 textAlign: 'center',
                 marginLeft: 5,
                 marginBottom: 3,
                 width: 50,
                 boxShadow: 'rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px'
             }}
        ><div style={{padding: '10px 0px'}}>{target.coords ? doneIcon(props.selected === target.number) : null}{target.number}</div></div>));
    return (
        <Slider {...settings}>
            {itemsList(props.targets)}
        </Slider>
        );
        };

Targets.propTypes = {
    selected: PropTypes.number,
    targets: PropTypes.arrayOf(targetShape),
    selectTarget: PropTypes.func,
};

const _mapStateToProps = state => ({
    selected: state.course.selectedTarget,
    targets: state.targets,
});

const _mapDispatchToProps = dispatch => ({
    selectTarget: bindActionCreators(selectTarget, dispatch),
});

export default connect(_mapStateToProps, _mapDispatchToProps)(Targets);
