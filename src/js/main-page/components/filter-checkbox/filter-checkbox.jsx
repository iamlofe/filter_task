import React from 'react';
import PropTypes from 'prop-types';

import DemmisionsRecord from 'main/records/dimensions-record';
import ContextsRecord from 'main/records/contexts-record';
import ResultsRecord from 'main/records/results-record';

import './filter-checkbox.scss';

class FilterCheckbox extends React.PureComponent {
    static propTypes = {
        filterId: PropTypes.string.isRequired,
        filteredItem: PropTypes.oneOfType([
            PropTypes.instanceOf(DemmisionsRecord),
            PropTypes.instanceOf(ContextsRecord),
            PropTypes.instanceOf(ResultsRecord)
        ]).isRequired,
        onChangeState: PropTypes.func.isRequired,
        checked: PropTypes.bool.isRequired
    };

    onChangeState = () => {
        const { filterId, onChangeState, filteredItem } = this.props;

        onChangeState(
            filterId,
            filteredItem.get('contextId'),
            filteredItem.get('demisionId'),
            filteredItem.get('resultId')
        );
    };

    render() {
        const { filteredItem, checked, filterId } = this.props;

        return (
            <div className="filter-container__checkbox">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={this.onChangeState}
                    className="filter-container__input-checkbox"
                    id={`${filterId}${filteredItem.get('id')}`}
                />
                <label htmlFor={`${filterId}${filteredItem.get('id')}`} className="filter-container__title-checkbox">
                    {filteredItem.get('title')}
                </label>
            </div>
        );
    }
}

export default FilterCheckbox;
