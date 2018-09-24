import React from 'react';
import className from 'classnames';
import PropTypes from 'prop-types';

import { CurrentContext } from '../../records/filter-record';

import './filter-search-type.scss';

const SearchTypeItem = ({
    symbol, type, dataFilter, onChooseTypeSearch, filterId
}) => (
    <div
        className={className('filter-container__sorts-example', {
            'filter-container__sorts-example--focus': dataFilter.get('searchType') === type
        })}
        onClick={() => onChooseTypeSearch(filterId, type)}
    >
        {symbol}
    </div>
);

SearchTypeItem.propTypes = {
    onChooseTypeSearch: PropTypes.func.isRequired,
    dataFilter: PropTypes.instanceOf(CurrentContext).isRequired,
    type: PropTypes.string.isRequired,
    symbol: PropTypes.string.isRequired,
    filterId: PropTypes.string.isRequired
};

export default SearchTypeItem;
