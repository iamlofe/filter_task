import React from 'react';
import className from 'classnames';
import Draggable from 'react-draggable';

class FilterWidget extends React.PureComponent {
    test() {
        const path = [];
        Array.prototype.forEach.call(arguments, (arg, index) => {
            if (index == 2 && typeof arg == 'number') {
                path.push('listsDimensions');
            } else if (index == 3 && typeof arg == 'number') {
                path.push('listsResults');
            }
            path.push(arg);
        });
        path.pop();
        this.props.onChangeStatusContext(path);
    }
    clickTest = () => {
        console.log(this.props);
    };
    render() {
        const { indexFilter, filterList, onOpenContextList, onOpenDemisionsList } = this.props;

        return (
            <Draggable
                handle=".filter-container__icon"
                defaultPosition={{ x: 0, y: 0 }}
                position={null}
                grid={[0.01, 0.01]}
                onStart={this.handleStart}
                onDrag={this.handleDrag}
                onStop={this.handleStop}
                key={indexFilter}
            >
                <div
                    className={className('filter-container', {
                        'filter-container--open': filterList.getIn([indexFilter, 0, 'isActiveLists', 'isOpenFilter']),
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
                                    <div
                                        className="filter-container__context-drop"
                                        onClick={() => onOpenContextList(indexFilter)}
                                    >
                                        <div className="filter-container__icon-drop-down" />
                                        <p className="filter-container__name">Context</p>
                                    </div>
                                    <div
                                        className={className('filter-container__dropdown-list-context', {
                                            'filter-container__dropdown-list-context--open': filterList.getIn([
                                                indexFilter,
                                                0,
                                                'isActiveLists',
                                                'isActiveContext',
                                            ]),
                                        })}
                                    >
                                        {filterList.get(indexFilter).map((context, indexContext) => (
                                            <div className="filter-container__checkbox">
                                                <input
                                                    type="checkbox"
                                                    checked={context.get('isActive')}
                                                    onChange={this.test.bind(this, indexFilter, indexContext)}
                                                />
                                                <p>{context.get('title')}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="filter-container__demisions">
                                    <div
                                        className="filter-container__demisions-drop"
                                        onClick={() => onOpenDemisionsList(indexFilter)}
                                    >
                                        <div className="filter-container__icon-drop-down" />

                                        <p className="filter-container__name">Demisions</p>
                                    </div>
                                    <div
                                        className={className('filter-container__dropdown-list-demisions', {
                                            'filter-container__dropdown-list-demisions--open': filterList.getIn([
                                                indexFilter,
                                                0,
                                                'isActiveLists',
                                                'isActiveDemision',
                                            ]),
                                        })}
                                    >
                                        {filterList.get(indexFilter).map((context, indexContext) => (
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
                                        ))}
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
                                    {filterList.get(indexFilter).map((context, indexContext) => (
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
                                    ))}
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
