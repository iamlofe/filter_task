import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';

import FilterCheckbox from '../filter-checkbox/filter-checkbox';

import './filter-items.scss';

class FilterItems extends React.PureComponent {
    static propTypes = {
        filteredList: PropTypes.instanceOf(List),
        selectedItems: PropTypes.instanceOf(List),
        filterId: PropTypes.string.isRequired,
        onChangeState: PropTypes.func
    };

    static defaultProps = {
        filteredList: new List(),
        selectedItems: new List(),
        onChangeState: () => {}
    };
    render() {
        const {
            filteredList, filterId, onChangeState, selectedItems, displayClass
        } = this.props;

        const checkboxProps = {
            filterId,
            onChangeState,
            selectedItems,
            displayClass
        };

        return (
            <React.Fragment>
                {filteredList &&
                    filteredList.map(filteredItem => (
                        <FilterCheckbox
                            key={filteredItem.get('id')}
                            filteredItem={filteredItem}
                            {...checkboxProps}
                            checked={selectedItems.includes(filteredItem.get('id'))}
                        />
                    ))}
            </React.Fragment>
        );
    }
}
export default FilterItems;
