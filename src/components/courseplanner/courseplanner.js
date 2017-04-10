import React from 'react';
import { Groups, Targets, Animals } from '../../components';
import { withGoogleMap} from 'react-google-maps';

const CoursePlanner = () => {

        return (<div>
            <Targets />
            <Groups />
            <Animals />
        </div>);
};

export default CoursePlanner;
