import React from 'react';

import './filter-items.scss';

class FilterItems extends React.PureComponent {
    render() {
        const {
            filteredList, filterId, onChangeState, selectItems,
        } = this.props;
        return (
            <React.Fragment>
                {filteredList && filteredList.map(filteredItem => (<div className="filter-container__checkbox" >
                    <input
                        type="checkbox"
                        key={filteredItem.get('contextId')}
                        checked={selectItems.includes(filteredItem.get('id'))}
                        onChange={() => onChangeState({
                            filterId, contextId: filteredItem.get('contextId'), demisionId: filteredItem.get('demisionId'), resultId: filteredItem.get('resultId')
                        })}
                    />
                    <p>{filteredItem.get('title')}</p>
                </div>))}

            </React.Fragment>
        );
    }
}
export default FilterItems;
