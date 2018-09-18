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
        onChangeState({
            filterId,
            contextId: filteredItem.get('contextId'),
            demisionId: filteredItem.get('demisionId'),
            resultId: filteredItem.get('resultId')
        });
    };
    render() {
        const { filteredItem, checked } = this.props;
        return (
            <div className="filter-container__checkbox">
                <input type="checkbox" checked={checked} onChange={this.onChangeState} />
                <p>{filteredItem.get('title')}</p>
            </div>
        );
    }
}
export default FilterCheckbox;
