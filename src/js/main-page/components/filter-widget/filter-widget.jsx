import React from 'react';
import className from 'classnames';
import Draggable from 'react-draggable';
import PropTypes from 'prop-types';
import { List } from 'immutable';

import FilterItems from '../filter-items/filter-items';
import { CurrentContext } from '../../records/context-record';


import './filter-widget.scss';

class FilterWidget extends React.PureComponent {
    static propTypes = {
        isOpenFilterWidget: PropTypes.bool.isRequired,
        onChangeStateContext: PropTypes.func.isRequired,
        filterId: PropTypes.string.isRequired,
        onChangeStateResult: PropTypes.func,
        onChooseTypeSearch: PropTypes.func,
        onInputTitleSearch: PropTypes.func,
        onChangeStateDemission: PropTypes.func,
        dataFilter: PropTypes.instanceOf(CurrentContext).isRequired,
        filteredDemisions: PropTypes.instanceOf(List),
        contextsList: PropTypes.instanceOf(List),
        filteredResultsWithSort: PropTypes.instanceOf(List),
        selectContext: PropTypes.instanceOf(List),
        selectDemision: PropTypes.instanceOf(List),
        selectResults: PropTypes.instanceOf(List)

    }

    static defaultProps = {
        onChangeStateResult: () => {},
        onChooseTypeSearch: () => {},
        onInputTitleSearch: () => {},
        onChangeStateDemission: () => {},
        filteredDemisions: new List(),
        contextsList: new List(),
        filteredResultsWithSort: new List(),
        selectContext: new List(),
        selectDemision: new List(),
        selectResults: new List()
    }

    state = {
        isOpenContexts: false,
        isOpenDemissions: false,
    };

    onOpenContexts = () => {
        this.setState({
            isOpenContexts: !this.state.isOpenContexts,
            isOpenDemissions: false,
        });
    };

    onOpenDemissions = () => {
        this.setState({
            isOpenDemissions: !this.state.isOpenDemissions,
            isOpenContexts: false,
        });
    };

    clickTest = () => {
        console.log(this.props);
    };

    render() {
        const {
            contextsList, filteredResultsWithSort, selectResults, selectContext, selectDemision,
            filterId, isOpenFilterWidget, onChangeStateContext, dataFilter, onChangeStateResult,
            onChooseTypeSearch, onInputTitleSearch, filteredDemisions, onChangeStateDemission
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
                <div
                    className={className('filter-container', {
                        'filter-container--open': isOpenFilterWidget,
                    })}
                    onClick={this.clickTest}
                >
                    <div className="filter-container__content">
                        <div className="filter-container__header">
                            <div className="filter-container__icon" />
                            <div className="filter-container__label">FILTERS</div>
                        </div>
                        <div className="filter-container__main">
                            <div className="filter-container__main-content">
                                <div className="filter-container__context">
                                    <div className="filter-container__context-drop" onClick={this.onOpenContexts}>
                                        <div className="filter-container__icon-drop-down" />
                                        <p className="filter-container__name">Context</p>
                                    </div>
                                    <div
                                        className={className('filter-container__dropdown-list-context', {
                                            'filter-container__dropdown-list-context--open': this.state.isOpenContexts,
                                        })}
                                    >
                                        <FilterItems
                                            filterId={filterId}
                                            filteredList={contextsList}
                                            onChangeState={
                                                onChangeStateContext
                                            }
                                            selectItems={selectContext}
                                        />
                                    </div>
                                </div>

                                <div className="filter-container__demisions">
                                    <div className="filter-container__demisions-drop" onClick={this.onOpenDemissions}>
                                        <div className="filter-container__icon-drop-down" />
                                        <p className="filter-container__name">Demisions</p>
                                    </div>
                                    <div
                                        className={className('filter-container__dropdown-list-demisions', {
                                            'filter-container__dropdown-list-demisions--open': this.state
                                                .isOpenDemissions,
                                        })}
                                    >

                                        <FilterItems
                                            filterId={filterId}
                                            filteredList={filteredDemisions}
                                            onChangeState={
                                                onChangeStateDemission
                                            }
                                            selectItems={selectDemision}
                                        />
                                    </div>
                                </div>
                                <div className="filter-container__search">
                                    <div className="filter-container__container-search">
                                        <div className="filter-container__icon-search" />
                                        <div className="filter-container__container-field">
                                            <input type="text" className="filter-container__field-search" onChange={e => onInputTitleSearch({ filterId, titleSearch: e.target.value })} />
                                            <div className="filter-container__sorts">
                                                <div
                                                    className={className('filter-container__sorts-example', {
                                                        'filter-container__sorts-example--focus': dataFilter.get('searchType') === 'exactMatch'
                                                    })}
                                                    onClick={() => onChooseTypeSearch({ filterId, searchType: 'exactMatch' })}
                                                >**
                                                </div>
                                                <div
                                                    className={className('filter-container__sorts-example', {
                                                        'filter-container__sorts-example--focus': dataFilter.get('searchType') === 'overlap'
                                                    })}
                                                    onClick={() => onChooseTypeSearch({ filterId, searchType: 'overlap' })}
                                                >*
                                                </div>
                                                <div
                                                    className={className('filter-container__sorts-example', {
                                                        'filter-container__sorts-example--focus': dataFilter.get('searchType') === 'beginWith'
                                                    })}
                                                    onClick={() => onChooseTypeSearch({ filterId, searchType: 'beginWith' })}
                                                >A-Z
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {dataFilter.get('searchType')}
                                <div className="filter-container__list-results">
                                    <FilterItems
                                        selectItems={selectResults}
                                        filterId={filterId}
                                        filteredList={filteredResultsWithSort}

                                        onChangeState={
                                            onChangeStateResult
                                        }
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
