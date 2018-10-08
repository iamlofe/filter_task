import React from 'react';
import { shallow } from 'enzyme';

import FilterList from 'main-page/components/filter-list/filter-list';

describe('account component', () => {
    it('is shallow rendered without crashing', () => {
        const baseProps = {
            isStatusLoadData: false,
            onLoadData: jest.fn(),
            onCreateDisplay: jest.fn(),
            filterIds: ['']
        };

        const filterChecbox = <FilterList {...baseProps} />;

        const filterChecboxComponent = shallow(filterChecbox);
        expect(filterChecboxComponent).toMatchSnapshot();
    });

    it('is shallow rendered with statusLoad true without crashing', () => {
        const baseProps = {
            onLoadData: jest.fn(),
            onCreateDisplay: jest.fn(),
            isStatusLoadData: false,
            filterIds: ['']
        };

        const filterChecbox = <FilterList {...baseProps} isStatusLoadData />;

        const filterChecboxComponent = shallow(filterChecbox);
        expect(filterChecboxComponent).toMatchSnapshot();
    });
});
