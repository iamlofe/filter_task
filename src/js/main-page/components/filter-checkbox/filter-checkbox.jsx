import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';

import './filter-checkbox.scss';

class FilterCheckbox extends React.PureComponent {
    static propTypes = {
        filterId: PropTypes.string.isRequired,
        filteredItem: PropTypes.instanceOf(List),
        onChangeState: PropTypes.func.isRequired,
        selectItems: PropTypes.instanceOf(List)
    }

    static defaultProps = {
        filteredItem: new List(),
        selectItems: new List()
    }

    onChangeState = () => {
        const {
            filterId, onChangeState, filteredItem,
        } = this.props;
        onChangeState({
            filterId, contextId: filteredItem.get('contextId'), demisionId: filteredItem.get('demisionId'), resultId: filteredItem.get('resultId')
        });
    }
    render() {
        const { filteredItem, selectItems } = this.props;
        return (
            <div className="filter-container__checkbox" >
                <input
                    type="checkbox"
                    checked={selectItems.includes(filteredItem.get('id'))}
                    onChange={this.onChangeState}
                />
                <p>{filteredItem.get('title')}</p>
            </div>
        );
    }
}
export default FilterCheckbox;
