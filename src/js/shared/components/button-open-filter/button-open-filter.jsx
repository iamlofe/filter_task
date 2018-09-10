import React from 'react';

import './button-open-filter.scss';

export default ({ onOpenFilter, indexFilter }) => (
    <div className="filter-container__button-open-filter">
        <p
            onClick={() => {
                onOpenFilter(indexFilter);
            }}
        >
            Open
        </p>
    </div>
);
