import React from 'react';
import { shallow, mount } from 'enzyme';
import { List } from 'immutable';

import FilterState from 'main-page/components/filter-state/filter-state';
import { getMockListItems } from '../../mock-store/mock-filter-reducer';

describe('component filter state', () => {
    const baseProps = {
        listItems: getMockListItems(),
        selectedItems: new List([3, 4]),
        label: 'pow'
    };

    it('should make snapshot without crashing', () => {
        const filteState = shallow(<FilterState {...baseProps} />);
        expect(filteState).toMatchSnapshot();
    });

    it("should don't render element if selectedItems is empty", () => {
        const filteState = shallow(<FilterState {...baseProps} selectedItems={new List()} />);
        expect(filteState).toMatchSnapshot();
    });

    it('should show title', () => {
        const filteState = shallow(<FilterState {...baseProps} />);
        expect(filteState.find('.filter-container__display-context-title').text()).toEqual(`${baseProps.label}:`);
    });

    it('should have truth length', () => {
        const filteState = mount(<FilterState {...baseProps} />);
        expect(filteState.find('.filter-container__display-context-list').children().length).toEqual(baseProps.selectedItems.count());
    });
});
