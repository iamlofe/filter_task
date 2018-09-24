import React from 'react';
import PropTypes from 'prop-types';

import Button from 'shared/components/button-filter/button-filter';
import Filter from '../../containers/filter-container';

import './filter-list.scss';

class FilterList extends React.PureComponent {
    static propTypes = {
        onLoadData: PropTypes.func.isRequired,
        onCreateDisplay: PropTypes.func.isRequired,
        isStatusLoadData: PropTypes.bool.isRequired,
        filterIds: PropTypes.arrayOf(PropTypes.string),
        deleteFilter: PropTypes.func.isRequired
    };

    static defaultProps = {
        filterIds: []
    };

    componentDidMount() {
        this.props.onLoadData();
    }

    deleteFilterUpdate = (filterId) => {
        this.props.deleteFilter(filterId);
    };

    render() {
        const { isStatusLoadData, filterIds, onCreateDisplay } = this.props;
        return (
            <div className="filter-container__main-container">
                {isStatusLoadData ? (
                    <span>...</span>
                ) : (
                    <Button onClick={onCreateDisplay} className="filter__button-create" label="Create" />
                )}
                <div className="filter-container__state-container">
                    {filterIds.map(filterId => (
                        <Filter key={filterId} filterId={filterId} onDeleteFilterUpdate={this.deleteFilterUpdate} />
                    ))}
                </div>
            </div>
        );
    }
}

export default FilterList;
