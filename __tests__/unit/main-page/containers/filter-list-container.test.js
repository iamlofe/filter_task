import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';

import FilterList from 'main-page/containers/filter-list-container';
import { createDisplay } from 'main-page/actions/filter-actions';
import { getMockStateMainItems } from '../mock-store/mock-filter-reducer';

describe('Investments Tab container', () => {
    const basePropsFilterList = {
        onLoadData: jest.fn(),
        onCreateDisplay: jest.fn(),
        isStatusLoadData: false,
        filterIds: ['wdw']
    };
    const mockStore = configureMockStore();

    let container;
    beforeEach(() => {
        const store = mockStore(getMockStateMainItems());

        container = shallow(<FilterList store={store} {...basePropsFilterList} />);
    });

    it('should render with props from initialState', () => {
        const dispatch = jest.fn();

        expect(container.prop('onCreateDisplay')(dispatch)).toEqual(createDisplay());
    });
});
