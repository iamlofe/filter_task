import React from 'react';
import className from 'classnames';
import Draggable from 'react-draggable';
import PropTypes from 'prop-types';
import { List } from 'immutable';

import FilterItems from '../filter-items/filter-items';

import FilterSelectedItems from '../filter-selected-items/filter-selected-items';

import { CurrentContext } from '../../records/filter-record';
import SearchTypeItem from '../filter-search-type/filter-search-type';
import { SearchTypes, SearchTypesLabels } from '../../constants/filter-constants';

import './filter-widget.scss';

const searchTypes = Object.values(SearchTypes);

class FilterWidget extends React.PureComponent {
    static propTypes = {
        searchString: PropTypes.string.isRequired,
        onChangeStateContext: PropTypes.func.isRequired,
        filterId: PropTypes.string.isRequired,
        onChangeStateResult: PropTypes.func.isRequired,
        onChooseTypeSearch: PropTypes.func.isRequired,
        onInputTitleSearch: PropTypes.func.isRequired,
        onChangeStateDemission: PropTypes.func.isRequired,
        dataFilter: PropTypes.instanceOf(CurrentContext).isRequired,
        filteredDemisions: PropTypes.instanceOf(List).isRequired,
        contexts: PropTypes.instanceOf(List).isRequired,
        filteredResultsWithSort: PropTypes.instanceOf(List).isRequired,
        selectedContext: PropTypes.instanceOf(List).isRequired,
        selectedDemision: PropTypes.instanceOf(List).isRequired,
        selectedResults: PropTypes.instanceOf(List).isRequired,
        onToggleWidget: PropTypes.func.isRequired
    };

    state = {
        isOpenContexts: false,
        isOpenDemissions: false
    };

    onOpenContexts = () => {
        this.setState({
            isOpenContexts: !this.state.isOpenContexts,
            isOpenDemissions: false
        });
    };

    onOpenDemissions = () => {
        this.setState({
            isOpenDemissions: !this.state.isOpenDemissions,
            isOpenContexts: false
        });
    };

    onSearchStringChange = (e) => {
        this.props.onInputTitleSearch(this.props.filterId, e.target.value);
    };

    render() {
        const {
            contexts,
            filteredResultsWithSort,
            selectedResults,
            selectedContext,
            selectedDemision,
            filterId,
            onChangeStateContext,
            dataFilter,
            onChangeStateResult,
            onChooseTypeSearch,
            filteredDemisions,
            searchString,
            onChangeStateDemission,
            onToggleWidget
        } = this.props;

        return (
            <Draggable
                handle=".filter-container__icon"
                defaultPosition={{ x: 0, y: 0 }}
                position={null}
                grid={[0.01, 0.01]}
                onStart={this.handleStart}
                onDrag={this.handleDrag}
                onStop={this.handleStop}
            >
                <div className={className('filter-container')}>
                    <div className="filter-container__content">
                        <div className="filter-container__header">
                            <div className="filter-container__icon" />
                            <div className="filter-container__label">FILTERS</div>
                            <div className="filter-container__close" onClick={onToggleWidget} />
                        </div>
                        <div className="filter-container__main">
                            <div className="filter-container__main-content">
                                <div className="filter-container__context">
                                    <div className="filter-container__context-drop" onClick={this.onOpenContexts}>
                                        <div className="filter-container__icon-drop-down" />
                                        <p className="filter-container__name">Context</p>
                                        <FilterSelectedItems filteredList={contexts} selectedItems={selectedContext} />
                                    </div>
                                    <div
                                        className={className('filter-container__dropdown-list-context', {
                                            'filter-container__dropdown-list-context--open': this.state.isOpenContexts
                                        })}
                                    >
                                        <FilterItems
                                            filterId={filterId}
                                            filteredList={contexts}
                                            onChangeState={onChangeStateContext}
                                            selectedItems={selectedContext}
                                        />
                                    </div>
                                </div>

                                <div className="filter-container__demisions">
                                    <div className="filter-container__demisions-drop" onClick={this.onOpenDemissions}>
                                        <div className="filter-container__icon-drop-down" />
                                        <p className="filter-container__name">Demisions</p>
                                        <FilterSelectedItems
                                            filteredList={filteredDemisions}
                                            selectedItems={selectedDemision}
                                        />
                                    </div>
                                    <div
                                        className={className('filter-container__dropdown-list-demisions', {
                                            'filter-container__dropdown-list-demisions--open': this.state
                                                .isOpenDemissions
                                        })}
                                    >
                                        <FilterItems
                                            filterId={filterId}
                                            filteredList={filteredDemisions}
                                            onChangeState={onChangeStateDemission}
                                            selectedItems={selectedDemision}
                                        />
                                    </div>
                                </div>
                                <div className="filter-container__search">
                                    <div className="filter-container__container-search">
                                        <div className="filter-container__icon-search" />
                                        <div className="filter-container__container-field">
                                            <input
                                                type="text"
                                                className="filter-container__field-search"
                                                value={searchString}
                                                onChange={this.onSearchStringChange}
                                            />
                                            <div className="filter-container__sorts">
                                                {searchTypes.map(searchType => (
                                                    <SearchTypeItem
                                                        key={searchType}
                                                        dataFilter={dataFilter}
                                                        symbol={SearchTypesLabels[searchType]}
                                                        type={searchType}
                                                        onChooseTypeSearch={onChooseTypeSearch}
                                                        filterId={filterId}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="filter-container__list-results">
                                    <FilterItems
                                        selectedItems={selectedResults}
                                        filterId={filterId}
                                        filteredList={filteredResultsWithSort}
                                        onChangeState={onChangeStateResult}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Draggable>
        );
    }
}

export default FilterWidget;
