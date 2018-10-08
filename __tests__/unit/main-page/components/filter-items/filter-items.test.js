import React from 'react';
import { shallow } from 'enzyme';
import { List } from 'immutable';

import FilterItems from 'main-page/components/filter-items/filter-items';
import FilterCheckbox from 'main-page/components/filter-checkbox/filter-checkbox';
import { getMockListItems } from '../../mock-store/mock-filter-reducer';

describe('account component', () => {
    const baseProps = {
        filteredList: new List(),
        selectedItems: new List(),
        filterId: '',
        onChangeState: jest.fn(),
        displayClass: ''
    };

    it('is shallow rendered without crashing', () => {
        const filterChecbox = <FilterItems {...baseProps} />;

        const filterChecboxComponent = shallow(filterChecbox);
        expect(filterChecboxComponent).toMatchSnapshot();
    });

    it('is shallow rendered with not empty filteredList without crashing', () => {
        const filterChecbox = <FilterItems {...baseProps} filteredList={getMockListItems()} />;

        const filterChecboxComponent = shallow(filterChecbox);
        expect(filterChecboxComponent).toMatchSnapshot();
    });

    it('should truth length', () => {
        const filterChecbox = <FilterItems {...baseProps} />;

        const filterChecboxComponent = shallow(filterChecbox);
        expect(filterChecboxComponent.find(FilterCheckbox).length).toEqual(0);
    });
});
