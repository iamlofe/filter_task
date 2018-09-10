import React from 'react';

import './button-create-filter.scss';

export default ({ test }) => (
    <div className="filter__button-create">
        <p onClick={test}>Add</p>
    </div>
);
