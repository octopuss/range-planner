import { filter, whereEq, merge } from 'ramda';

export const resolveTarget = ({ targets, plan }) => filter(
    whereEq({ number: plan.selectedTarget }))(targets)[0];

export const commonSettings = (className) => merge(
    {dots: false,
        className: className,
        infinite: false,
        speed: 500,
        variableWidth: false,
        arrows: false,
        initialSlide: 0}
);

export const getPosition = () => {
    let navigator = typeof window !== 'undefined' ? window.navigator : null;
    if (!navigator || !navigator.geolocation) {
        return Promise.reject(Object.assign(new Error('geo location API is not supported'), { code: NOT_SUPPORTED }));
    }
    let geoTimeout = navigator.userAgent.toLowerCase().indexOf("android") > -1 ? '15000' : '1000';
    return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: false, maximumAge: 100, timeout: geoTimeout });
    });
};
