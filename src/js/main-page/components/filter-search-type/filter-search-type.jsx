import React from 'react';
import className from 'classnames';
import PropTypes from 'prop-types';

import { CurrentContext } from '../../records/filter-record';

import './filter-search-type.scss';

class SearchTypeItem extends React.PureComponent {
    static propTypes = {
        onChooseTypeSearch: PropTypes.func.isRequired,
        dataFilter: PropTypes.instanceOf(CurrentContext).isRequired,
        type: PropTypes.string.isRequired,
        symbol: PropTypes.string.isRequired,
        filterId: PropTypes.string.isRequired
    };

    onChooseTypeSearch = () => {
        const { filterId, type, onChooseTypeSearch } = this.props;
        onChooseTypeSearch(filterId, type);
    };

    render() {
        const { symbol, type, dataFilter } = this.props;

        return (
            <div
                className={className('filter-container__sorts-example', {
                    'filter-container__sorts-example--focus': dataFilter.get('searchType') === type
                })}
                onClick={this.onChooseTypeSearch}
            >
                {symbol}
            </div>
        );
    }
}

export default SearchTypeItem;
