import React from 'react';
import PropTypes from 'prop-types';

import Button from 'shared/components/button-filter/button-filter';
import Filter from 'main-page/containers/filter-container';

import './filter-list.scss';

class FilterList extends React.PureComponent {
    static propTypes = {
        onLoadData: PropTypes.func.isRequired,
        onCreateDisplay: PropTypes.func.isRequired,
        isStatusLoadData: PropTypes.bool.isRequired,
        filterIds: PropTypes.arrayOf(PropTypes.string).isRequired
    };

    componentDidMount() {
        this.props.onLoadData();
    }

    render() {
        const { isStatusLoadData, filterIds, onCreateDisplay } = this.props;

        return (
            <div className="filter-container__main-container">
                {isStatusLoadData && <span>...</span>}
                {!isStatusLoadData && (
                    <Button onClick={onCreateDisplay} className="filter__button-create" label="Create" />
                )}
                <div className="filter-container__state-container">
                    {filterIds.map(filterId => (
                        <Filter key={filterId} filterId={filterId} />
                    ))}
                </div>
            </div>
        );
    }
}

export default FilterList;
