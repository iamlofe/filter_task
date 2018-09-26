import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';

import FilterCheckbox from '../filter-checkbox/filter-checkbox';

import './filter-items.scss';

class FilterItems extends React.PureComponent {
    static propTypes = {
        filteredList: PropTypes.instanceOf(List).isRequired,
        selectedItems: PropTypes.instanceOf(List).isRequired,
        filterId: PropTypes.string.isRequired,
        onChangeState: PropTypes.func.isRequired,
        displayClass: PropTypes.string
    };

    static defaultProps = {
        displayClass: ''
    };

    render() {
        const {
            filteredList, filterId, onChangeState, selectedItems, displayClass
        } = this.props;

        return (
            <React.Fragment>
                {filteredList &&
                    filteredList.map(filteredItem => (
                        <FilterCheckbox
                            key={filteredItem.get('id')}
                            filteredItem={filteredItem}
                            filterId={filterId}
                            onChangeState={onChangeState}
                            selectedItems={selectedItems}
                            displayClass={displayClass}
                            checked={selectedItems.includes(filteredItem.get('id'))}
                        />
                    ))}
            </React.Fragment>
        );
    }
}
export default FilterItems;
