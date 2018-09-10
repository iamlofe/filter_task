import React from 'react';
import propTypes from 'prop-types';

import './button-open-filter.scss';

const FilterButtonOpenWidget = ({ onOpenFilterWidget }) => (
    <div className="filter-container__button-open-filter">
        <p onClick={onOpenFilterWidget}>Open</p>
    </div>
);

FilterButtonOpenWidget.propTypes = {
    onOpenFilterWidget: propTypes.func.isRequired
};

export default FilterButtonOpenWidget;
