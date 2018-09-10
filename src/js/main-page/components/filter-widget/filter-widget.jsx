import React from 'react';
import className from 'classnames';
import Draggable from 'react-draggable';
import propTypes from 'prop-types';
// import { List } from 'antd';

class FilterWidget extends React.PureComponent {
    static propTypes = {
        isOpenFilterWidget: propTypes.bool.isRequired,
        onChangeStateContext: propTypes.func.isRequired
    }
    state = {
        isOpenContexts: false,
        isOpenDemissions: false,
    };

    onOpenContexts = () => {
        this.setState({
            isOpenContexts: !this.state.isOpenContexts,
        });
    };

    onOpenDemissions = () => {
        this.setState({
            isOpenDemissions: !this.state.isOpenDemissions,
        });
    };

    clickTest = () => {
        console.log(this.props);
    };

    render() {
        const {
            filterId, isOpenFilterWidget, initialFilterData, onChangeStateContext, dataFilter, onChangeStateDemission, onChangeStateResult
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
                                        {initialFilterData &&
                                            initialFilterData.map((context, id) => (
                                                <div className="filter-container__checkbox" key={id}>
                                                    <input
                                                        type="checkbox"
                                                        onChange={() => onChangeStateContext({ filterId, contextId: context.id })}
                                                    />
                                                    <p>{context.get('id')}</p>
                                                </div>
                                            ))}
                                        {/* {filterList.get(indexFilter).map((context, indexContext) => (
                                            <div className="filter-container__checkbox">
                                                <input
                                                    type="checkbox"
                                                    checked={context.get('isActive')}
                                                    onChange={this.test.bind(this, indexFilter, indexContext)}
                                                />
                                                <p>{context.get('title')}</p>
                                            </div>
                                        ))} */}
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
                                        {initialFilterData.map(context => (
                                            context.get('listsDimensions').map((dem) => {
                                                if (dataFilter.getIn([filterId, context.id])) {
                                                    return (<div className="filter-container__checkbox" key={dem.id}>
                                                        <input
                                                            type="checkbox"
                                                            onChange={() => onChangeStateDemission({ filterId, contextId: context.id, demisionId: dem.id })}
                                                        />
                                                        <p>{dem.get('id')}</p>
                                                            </div>);
                                                }
                                            })

                                        ))}


                                        {/* {filterList.get(indexFilter).map((context, indexContext) => (
                                            <div>
                                                {context.getIn(['listsDimensions', 0, 'isAccess']) &&
                                                    context.get('listsDimensions').map((dem, indexDemision) => (
                                                        <div className="filter-container__checkbox">
                                                            <input
                                                                type="checkbox"
                                                                value={dem.get('isActive')}
                                                                onChange={this.test.bind(
                                                                    this,
                                                                    indexFilter,
                                                                    indexContext,
                                                                    indexDemision,
                                                                )}
                                                            />
                                                            <p>{dem.get('title')}</p>
                                                        </div>
                                                    ))}
                                            </div>
                                        ))} */}
                                    </div>
                                </div>
                                <div className="filter-container__search">
                                    <div className="filter-container__container-search">
                                        <div className="filter-container__icon-search" />

                                        <div className="filter-container__container-field">
                                            <input type="text" className="filter-container__field-search" />
                                            <div className="filter-container__sorts">
                                                <div className="filter-container__sorts-example">**</div>
                                                <div className="filter-container__sorts-example">*</div>
                                                <div className="filter-container__sorts-example">A-Z</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="filter-container__list-results">

                                    {initialFilterData.map(context => (
                                        context.get('listsDimensions').map(dem => (
                                            dem.get('listsResults').map((res) => {
                                                if (dataFilter.getIn([filterId, context.id, dem.id])) {
                                                    return (<div className="filter-container__checkbox" key={res.id}>
                                                        <input
                                                            type="checkbox"
                                                            onChange={() => onChangeStateResult({
                                                                filterId, contextId: context.id, demisionId: dem.id, resultId: res.id
                                                            })}
                                                        />
                                                        <p>{res.get('id')}</p>
                                                    </div>);
                                                }
                                            })
                                        ))))}


                                    {/* {filterList.get(indexFilter).map((context, indexContext) => (
                                        <div>
                                            {context.getIn(['listsDimensions', 0, 'isAccess']) &&
                                                context.get('listsDimensions').map((dem, indexDemision) => (
                                                    <div>
                                                        {dem.getIn(['listsResults', 0, 'isAccess']) &&
                                                            dem.get('listsResults').map((res, indexResult) => (
                                                                <div className="filter-container__checkbox">
                                                                    <input
                                                                        type="checkbox"
                                                                        value={res.get('isActive')}
                                                                        onChange={this.test.bind(
                                                                            this,
                                                                            indexFilter,
                                                                            indexContext,
                                                                            indexDemision,
                                                                            indexResult,
                                                                        )}
                                                                    />
                                                                    <p>{res.get('id')}</p>
                                                                </div>
                                                            ))}
                                                    </div>
                                                ))}
                                        </div>
                                    ))} */}
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
