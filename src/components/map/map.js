import React from 'react';
import PropTypes from 'prop-types';
import {
    withGoogleMap,
    GoogleMap, Marker,
} from 'react-google-maps';
import { connect } from 'react-redux';
import { getPosition, resolveTarget } from '../../utils/';
import { bindActionCreators } from 'redux';
import { filter, map, curry } from 'ramda';
import { updateTarget, updatePosition, selectTarget } from '../../actions';

const MapContainer = withGoogleMap(props => {

    const { coords, curZoom } = props;

    const markerUrl = 'https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=';

    const _changePosition = marker =>
        props.updatePosition({ lat: marker.latLng.lat(), lng: marker.latLng.lng() });

    const _markersFromTargets = targets => {
        const _updateMarkerPosition = curry((target, marker) =>
            props.updateTarget(target, 'coords',
                { lat: marker.latLng.lat(), lng: marker.latLng.lng() })
        );
        const _setTarget = curry((target, e) => props.selectTarget(target));
        const hasCoords = ({ coords }) => coords !== null;
        const _markerIcon = number => {
            const colors = number === props.selectedTarget.number ? "33691E|FFFFFF" : "009688|FFFFFF";
            return markerUrl + number + "|" + colors;
        };
        const toMarker = target => {
            const { number, coords } = target;
            return <Marker key={number} position={coords}
                           draggable={true} onDragEnd={_updateMarkerPosition(target)}
                           onClick={_setTarget(target)} icon={_markerIcon(target.number)}/>;
        };
        return map(toMarker, filter(hasCoords)(targets));
    };
    return (
        <GoogleMap
            defaultZoom={curZoom}
            center={coords}
            defaultOptions={{ disableDefaultUI: true, mapTypeId: 'satellite' }}
        >
            <Marker position={coords} label="😎" draggable={true} onDragEnd={_changePosition} />
            {_markersFromTargets(props.targets)}
        </GoogleMap>
    );
});

const Map = props => {
    const element = <div style={{ width: '100%', height: '55vh' }} />;
    return (<MapContainer
            containerElement={element} mapElement={element}
            onMapLoad={props.getPosition} {...props}>
        </MapContainer>
    );
};

Map.propTypes = {
    coords: PropTypes.shape({
        lat: PropTypes.number,
        lng: PropTypes.number
    }),
    curZoom: PropTypes.number,
    targets: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        group: PropTypes.number,
        animalId: PropTypes.number,
        number: PropTypes.number,
        coords: PropTypes.shape({
            lat: PropTypes.number,
            lng: PropTypes.number
        })})),
    selectedTarget: PropTypes.shape({
        id: PropTypes.number.isRequired,
        group: PropTypes.number,
        animalId: PropTypes.number,
        number: PropTypes.number,
        coords: PropTypes.shape({
            lat: PropTypes.number,
            lng: PropTypes.number
        })}),
    getPosition: PropTypes.func,
    updatePosition: PropTypes.func,
    updateTarget: PropTypes.func,
};

const _mapStateToProps = state => ({
    coords: state.plan.coords,
    curZoom: state.plan.zoom,
    targets: state.targets,
    selectedTarget: resolveTarget(state)
});

const _mapDispatchToProps = dispatch => ({
    getPosition: bindActionCreators(getPosition, dispatch),
    updateTarget: bindActionCreators(updateTarget, dispatch),
    updatePosition: bindActionCreators(updatePosition, dispatch),
    selectTarget: bindActionCreators(selectTarget, dispatch),
});

export default connect(_mapStateToProps, _mapDispatchToProps)(Map);
