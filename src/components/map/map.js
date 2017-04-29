import React from 'react';
import {
    withGoogleMap,
    GoogleMap, Marker,
} from 'react-google-maps';
import { compose } from 'ramda';
import {
    firebaseConnect,
    dataToJS,
    pathToJS,
    isLoaded,
    isEmpty
} from 'react-redux-firebase'
import { connect } from 'react-redux';
import { reject, keys, propEq, map, curry } from 'ramda';

const MapContainer = withGoogleMap(props => {

    const { coords, curZoom, targets, selected, firebase, planId } = props;

    const colors = ['43a047', '1e88e5', 'fb8c00', '00acc1'];

    const markerUrl = 'https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=';

    const _changePosition = marker =>
        props.updatePosition({ lat: marker.latLng.lat(), lng: marker.latLng.lng() });

    const _updateMarkerPosition = curry((target, marker) =>
        firebase.set('/courses/' + planId + '/targets/' + target + '/coords',
            { lat: marker.latLng.lat(), lng: marker.latLng.lng() })
    );

    const _setTarget = curry(
        (target, e) => firebase.set('/courses/' + planId + '/selectedTarget', target));

    const _markerIcon = ({ group, number }, selected) => {
        const textColor = selected ? 'FFFFFF' : '000000';
        return markerUrl + number + "|" + colors[group - 1] + "|" + textColor;
    };

    const _markersFromTargets = (targets, selected) => map(target => {
            const { number, coords, name } = targets[target];
            return <Marker key={number} position={coords}
                           draggable={true} onDragEnd={_updateMarkerPosition(target)}
                           onClick={_setTarget(target)} icon={_markerIcon(targets[target], selected === target)}
                           title={name} />;
        })(keys(reject(propEq('coords', undefined),targets)));

    const _markerList = (!isLoaded(targets) || !isLoaded(selected))
        ? 'Loading'
        : _markersFromTargets(targets, selected);

    return (
        <GoogleMap
            defaultZoom={curZoom}
            center={coords}
            defaultOptions={{ disableDefaultUI: true, mapTypeId: 'satellite' }}
        >
            <Marker position={coords} label="😎" draggable={true} onDragEnd={_changePosition} />
            {_markerList}
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

const _mapStateToProps = (state, ownProps) => ({
    coords: state.course.coords,
    curZoom: state.course.zoom,
    targets: dataToJS(state.firebase, 'courses/' + ownProps.planId + '/targets'),
    selected: dataToJS(state.firebase, 'courses/' + ownProps.planId + '/selectedTarget'),
});

export default compose(firebaseConnect((props) => ['/courses/' + props.planId + '/targets',
        '/courses/' + props.planId + '/selectedTarget']), connect(_mapStateToProps, null),
    )(
    Map);
