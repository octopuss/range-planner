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

    const colors = ['43a047', '1e88e5', 'fb8c00', '00acc1'];

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
        const _markerIcon = ({ group, number }) => {
            const textColor = number === props.selectedTarget.number ? 'FFFFFF' : '000000';
            return markerUrl + number + "|" + colors[group-1] + "|" +textColor;
        };
        const toMarker = target => {
            const { number, coords } = target;
            return <Marker key={number} position={coords}
                           draggable={true} onDragEnd={_updateMarkerPosition(target)}
                           onClick={_setTarget(target)} icon={_markerIcon(target)} title={target.name}/>;
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

const _mapStateToProps = state => ({
    coords: state.course.coords,
    curZoom: state.course.zoom,
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
