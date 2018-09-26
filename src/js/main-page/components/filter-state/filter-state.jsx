import React from 'react';
import { List } from 'immutable';
import PropTypes from 'prop-types';

import './filter-state.scss';

class FilterState extends React.PureComponent {
    static propTypes = {
        label: PropTypes.string.isRequired,
        listItems: PropTypes.instanceOf(List).isRequired,
        selectedItems: PropTypes.instanceOf(List).isRequired
    };

    render() {
        const { label, listItems, selectedItems } = this.props;

        return (
            <React.Fragment>
                {!selectedItems.isEmpty() && (
                    <div className="filter-container__display-context">
                        <div className="filter-container__display-context-title">{label}:</div>
                        <div className="filter-container__display-context-list">
                            {listItems.filter(item => selectedItems.includes(item.get('id'))).map(item => (
                                <div key={item.get('id')}>{item.get('title')}</div>
                            ))}
                        </div>
                    </div>
                )}
            </React.Fragment>
        );
    }
}

export default FilterState;
