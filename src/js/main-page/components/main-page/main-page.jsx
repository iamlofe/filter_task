import React from 'react';

import FilterList from '../../containers/filter-list-container';

class MainPage extends React.PureComponent {
    render() {
        return (
            <React.Fragment>
                <FilterList />
            </React.Fragment>
        );
    }
}

export default MainPage;
