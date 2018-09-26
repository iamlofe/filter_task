import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';

import Portal from 'shared/components/portal/portal';
import Button from 'shared/components/button-filter/button-filter';
import FilterState from 'main-page/components/filter-state/filter-state';
import FilterWidget from 'main-page/containers/filter-widget-container';
import { CurrentContext } from '../../records/filter-record';

import './filter.scss';

const DisplayWidget = ({
    filterId,
    isRestoreAvailable,
    onToggleWidget,
    isWidgetOpen,
    onSaveDataWidget,
    onRestoreState,
    isSavingData,
    selectedContext,
    selectedDemision,
    selectedResults,
    contexts,
    demisions,
    results,
    onDeleteFilter,
    isRestoringData,
    dataWidget
}) => (
    <div className="filter-container__state">
        <div className="filter-container__state-content">
            <div className="filter-container__space-buttons">
                <Button
                    className="filter-container__button_open-filter"
                    onClick={onToggleWidget}
                    label={isWidgetOpen ? 'Close' : 'Open'}
                />
                <Button className="filter-container__button_delete-filter" onClick={onDeleteFilter} label="Delete" />

                <Button
                    className="filter-container__button_save-filter"
                    onClick={onSaveDataWidget}
                    label={isSavingData ? '...' : 'Save'}
                />
                {isRestoreAvailable && (
                    <Button
                        className="filter-container__button_restore-filter"
                        onClick={onRestoreState}
                        label={isRestoringData ? '...' : 'Restore'}
                    />
                )}
            </div>

            <div className="filter-container__display-state-container">
                <div className="filter-container__display-state">
                    <div className="filter-container__parametrs-search">
                        {dataWidget.get('searchTitle') && (
                            <div className="filter-container__type-search">
                                Type: <span>{dataWidget.get('searchType')}</span>
                            </div>
                        )}
                        {dataWidget.get('searchTitle') && (
                            <div className="filter-container__string-search">
                                Search: <span>{dataWidget.get('searchTitle')}</span>
                            </div>
                        )}
                    </div>
                    <FilterState label="Context" selectedItems={selectedContext} listItems={contexts} />
                    <FilterState label="Demisions" selectedItems={selectedDemision} listItems={demisions} />
                    <FilterState label="Results" selectedItems={selectedResults} listItems={results} />
                </div>
                {isWidgetOpen && (
                    <Portal>
                        <FilterWidget filterId={filterId} onToggleWidget={onToggleWidget} />
                    </Portal>
                )}
            </div>
        </div>
    </div>
);

DisplayWidget.propTypes = {
    filterId: PropTypes.string.isRequired,
    isRestoreAvailable: PropTypes.bool.isRequired,
    onRestoreState: PropTypes.func.isRequired,
    onToggleWidget: PropTypes.func.isRequired,
    isWidgetOpen: PropTypes.bool.isRequired,
    onSaveDataWidget: PropTypes.func.isRequired,
    isSavingData: PropTypes.bool.isRequired,
    selectedContext: PropTypes.instanceOf(List).isRequired,
    selectedDemision: PropTypes.instanceOf(List).isRequired,
    selectedResults: PropTypes.instanceOf(List).isRequired,
    contexts: PropTypes.instanceOf(List).isRequired,
    demisions: PropTypes.instanceOf(List).isRequired,
    results: PropTypes.instanceOf(List).isRequired,
    onDeleteFilter: PropTypes.func.isRequired,
    isRestoringData: PropTypes.bool.isRequired,
    dataWidget: PropTypes.instanceOf(CurrentContext).isRequired
};

export default DisplayWidget;
