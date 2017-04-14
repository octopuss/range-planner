import React from 'react';
import { Groups, Targets, Animals, Map, AddPoint } from '../../components';

const CoursePlanner = () => {

        return (<div>
            <Targets />
            <Groups />
            <div style={{clear: 'both'}}/>
            <Animals />
            <Map />
            <AddPoint />
        </div>);
};

export default CoursePlanner;
