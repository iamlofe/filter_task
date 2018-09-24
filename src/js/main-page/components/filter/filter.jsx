import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';

import Portal from 'shared/components/portal/portal';
import Button from 'shared/components/button-filter/button-filter';
import FilterState from 'main-page/components/filter-state/filter-state';
import FilterWidget from 'main-page/containers/filter-widget-container';

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
    contextsList,
    demisionsList,
    resultsList,
    onDeleteFilter,
    isRestoringData
}) => (
    <div className="filter-container__state">
        <div className="filter-container__state-content">
            <div className="filter-container__space-buttons">
                <Button className="filter-container__button_open-filter" onClick={onToggleWidget} label="Open" />
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
                    <FilterState label="Context" selectedItems={selectedContext} listItems={contextsList} />
                    <FilterState label="Demisions" selectedItems={selectedDemision} listItems={demisionsList} />
                    <FilterState label="Results" selectedItems={selectedResults} listItems={resultsList} />
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
    contextsList: PropTypes.instanceOf(List).isRequired,
    demisionsList: PropTypes.instanceOf(List).isRequired,
    resultsList: PropTypes.instanceOf(List).isRequired,
    onDeleteFilter: PropTypes.func.isRequired,
    isRestoringData: PropTypes.bool.isRequired
};

export default DisplayWidget;
