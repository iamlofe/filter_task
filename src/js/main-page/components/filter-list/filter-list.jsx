import React from 'react';
import propTypes from 'prop-types';

import ButtonCreateFilter from 'shared/components/button-create-filter/button-create-filter';
import Filter from '../../components/filter/filter';

import './filter-list.scss';

class FilterList extends React.PureComponent {
    static propTypes = {
        onLoadData: propTypes.func.isRequired,
        onCreateDisplay: propTypes.func.isRequired,
        isStatusLoadData: propTypes.bool.isRequired,
    }
    componentDidMount() {
        this.props.onLoadData();
        // const dim = parsed.reduce((acc, cur) => {
        //     return [...acc, ...cur.get('listsDimensions')];
        // }, []);

        // console.log(dim);

        // const res = dim.reduce((acc, cur) => {
        //     return [...acc, ...cur.get('listsResults')];
        // }, []);

        // console.log(res);
    }

    test = () => {
        this.props.onCreateDisplay();
        setTimeout(() => {
            console.log(this.props);
        }, 0);
    };
    render() {
        const { isStatusLoadData, filterIds } = this.props;
        return (
            <div className="filter-container__main-container">
                {isStatusLoadData ? <span>...</span> : <ButtonCreateFilter test={this.test} />}
                <div className="filter-container__state-container">
                    {filterIds && filterIds.map(filterId => <Filter key={filterId} filterId={filterId} />)}
                </div>
            </div>
        );
    }
}

export default FilterList;
