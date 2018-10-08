import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';

import './filter-selected-items.scss';

const FilterSelectedItems = ({ filteredList, selectedItems }) => (
    <div className="filter-container__list-selected-items">
        {filteredList.filter(item => selectedItems.includes(item.get('id'))).map(item => (
            <p key={item.get('id')}>{item.get('title')}</p>
        ))}
    </div>
);

FilterSelectedItems.propTypes = {
    filteredList: PropTypes.instanceOf(List).isRequired,
    selectedItems: PropTypes.instanceOf(List).isRequired
};

export default FilterSelectedItems;
