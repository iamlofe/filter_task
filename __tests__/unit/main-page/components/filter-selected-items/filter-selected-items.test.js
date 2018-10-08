import React from 'react';
import { shallow } from 'enzyme';
import { List } from 'immutable';

import FilterSelectedItems from 'main-page/components/filter-selected-items/filter-selected-items';
import { getMockListItems } from '../../mock-store/mock-filter-reducer';

describe('account component', () => {
    const baseProps = {
        filteredList: getMockListItems(),
        selectedItems: new List([4, 3])
    };

    it('is shallow rendered without crashing', () => {
        const filterSelectedItems = <FilterSelectedItems {...baseProps} />;

        const filterSelectedItemsComponent = shallow(filterSelectedItems);
        expect(filterSelectedItemsComponent).toMatchSnapshot();
    });

    it('should return truth length', () => {
        const filterSelectedItems = <FilterSelectedItems {...baseProps} />;

        const filterSelectedItemsComponent = shallow(filterSelectedItems);
        expect(filterSelectedItemsComponent.find('.filter-container__list-selected-items').children().length).toEqual(baseProps.selectedItems.count());
    });
});
