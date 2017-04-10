import { filter, whereEq, merge } from 'ramda';

export const resolveTarget = ({ targets, plan }) => filter(
    whereEq({ number: plan.selectedTarget }))(targets)[0];

export const commonSettings = (className) => merge(
    {dots: false,
        className: className,
        infinite: true,
        speed: 500,
        variableWidth: false,
        initialSlide: 0}
);
