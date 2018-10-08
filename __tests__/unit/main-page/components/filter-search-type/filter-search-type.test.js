import React from 'react';
import { shallow } from 'enzyme';
import { List } from 'immutable';

import FilterSearchType from 'main-page/components/filter-search-type/filter-search-type';
import { CurrentContext } from 'main-page/records/filter-record';
import { getMockListItems } from '../../mock-store/mock-filter-reducer';

describe('filter search type component', () => {
    const baseProps = {
        onChooseTypeSearch: jest.fn(),
        dataFilter: new CurrentContext(),
        type: 'beginWith',
        symbol: '*',
        filterId: 'test'
    };

    it('is shallow rendered without crashing', () => {
        const filterSearchType = <FilterSearchType {...baseProps} />;

        const filterSearchTypeComponent = shallow(filterSearchType);
        expect(filterSearchTypeComponent).toMatchSnapshot();
    });

    it('should return props symbol', () => {
        const filterSearchType = <FilterSearchType {...baseProps} />;

        const filterSearchTypeComponent = shallow(filterSearchType);
        expect(filterSearchTypeComponent.find('.filter-container__sorts-example').text()).toEqual(baseProps.symbol);
    });

    it('should hadle onChooseTypeSearch ', () => {
        const filterSearchType = <FilterSearchType {...baseProps} />;

        const filterSearchTypeComponent = shallow(filterSearchType);
        filterSearchTypeComponent.find('.filter-container__sorts-example').simulate('click');

        expect(baseProps.onChooseTypeSearch).toBeCalledWith(baseProps.filterId, baseProps.type);
    });
});
