import React from 'react';

import ButtonCreateFilter from 'shared/components/button-create-filter/button-create-filter';
import Filter from '../../components/filter/filter';

import RecordContext from '../../records/contexts-record';

import data from '../../constants/data.json';

import './filter-list.scss';

class FilterList extends React.PureComponent {
    componentDidMount() {
        const parsed = data.map(c => RecordContext.parse(c));
        console.log(parsed);

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
        const parsed = data.map(c => RecordContext.parse(c));
        console.log(parsed);

        this.props.onPushDataFilter(parsed);
        setTimeout(() => {
            console.log(this.props);
        }, 0);
    };
    render() {
        const { filterList, onOpenFilter } = this.props;
        return (
            <div className="filter-container__main-container">
                <ButtonCreateFilter test={this.test} />
                <div className="filter-container__state-container">
                    {filterList &&
                        filterList.map((filter, indexFilter) => (
                            <Filter key={indexFilter} indexFilter={indexFilter} onOpenFilter={onOpenFilter} />
                        ))}
                </div>
            </div>
        );
    }
}

export default FilterList;
