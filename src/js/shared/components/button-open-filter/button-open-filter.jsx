import React from 'react';
import propTypes from 'prop-types';
import classNames from 'classnames';

import './button-open-filter.scss';

const FilterButtonOpenWidget = ({ onMakeAction, label }) => (
    <div className={classNames('filter-container__button-filter', {
        'filter-container__button-open-filter': label === 'Open',
        'filter-container__button-save-filter': label === 'Save',
        'filter-container__button-restore-filter': label === 'Restore'
    })}
    >
        <p onClick={onMakeAction}>{label}</p>
    </div>
);

FilterButtonOpenWidget.propTypes = {
    onMakeAction: propTypes.func.isRequired
};

export default FilterButtonOpenWidget;
