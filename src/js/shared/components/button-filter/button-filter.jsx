import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './button-filter.scss';

const FilterButtonOpenWidget = ({ onClick, label, className }) => (
    <div className={classNames('filter-button', className)}>
        <p onClick={onClick}>{label}</p>
    </div>
);

FilterButtonOpenWidget.propTypes = {
    onClick: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    className: PropTypes.string
};
FilterButtonOpenWidget.defaultProps = {
    className: ''
};

export default FilterButtonOpenWidget;
