import React from 'react';

import FilterWidget from '../../containers/filter-widget-container';
import Portal from '../../../shared/components/portal/portal';
import ButtonOpenFilter from '../../../shared/components/button-open-filter/button-open-filter';

import './filter.scss';

export default ({ onOpenFilter, indexFilter }) => (
    <div className="filter-container__state">
        <div className="filter-container__state-content">
            <ButtonOpenFilter onOpenFilter={onOpenFilter} indexFilter={indexFilter} />
            <div className="filter-container__display-state-container">
                <div className="filter-container__display-state">ss</div>
                <Portal>
                    <FilterWidget indexFilter={indexFilter} />
                </Portal>
            </div>
        </div>
    </div>
);
