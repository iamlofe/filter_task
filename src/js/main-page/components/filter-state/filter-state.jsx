import React from 'react';
import { List } from 'immutable';
import PropTypes from 'prop-types';

import './filter-state.scss';

class FilterState extends React.PureComponent {
    static propTypes = {
        label: PropTypes.string.isRequired,
        listItems: PropTypes.instanceOf(List),
        selectedItems: PropTypes.instanceOf(List)
    };

    static defaultProps = {
        listItems: new List(),
        selectedItems: new List()
    };

    render() {
        const { label, listItems, selectedItems } = this.props;

        return (
            <React.Fragment>
                {!!selectedItems.count() && (
                    <div className="filter-container__display-context" onClick={this.test}>
                        <div className="filter-container__display-context-title">{label}:</div>
                        <div className="filter-container__display-context-list">
                            {listItems.map((item) => {
                                if (selectedItems.includes(item.get('id'))) {
                                    return <div key={item.get('id')}>{item.get('title')}</div>;
                                }
                            })}
                        </div>
                    </div>
                )}
            </React.Fragment>
        );
    }
}

export default FilterState;
