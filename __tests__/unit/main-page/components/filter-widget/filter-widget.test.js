import React from 'react';
import { shallow, mount } from 'enzyme';
import { List } from 'immutable';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';

import FilterWidget from 'main-page/components/filter-widget/filter-widget';
import { CurrentContext } from 'main-page/records/filter-record';
import { SearchTypes } from 'main-page/constants/filter-constants';
import { getMockStateFilter } from '../../mock-store/mock-filter-reducer';

describe('account component', () => {
    const baseProps = {
        searchString: '',
        filterId: 'test',
        onChangeStateContext: jest.fn(),
        onChangeStateResult: jest.fn(),
        onChooseTypeSearch: jest.fn(),
        onInputTitleSearch: jest.fn(),
        onChangeStateDemission: jest.fn(),
        onToggleWidget: jest.fn(),
        dataFilter: new CurrentContext(),
        filteredDemisions: new List(),
        contexts: new List(),
        filteredResultsWithSort: new List(),
        selectedContext: new List(),
        selectedDemision: new List(),
        selectedResults: new List(),
        filteredList: new List(),
        selectedItems: new List()
    };

    const mockStore = configureMockStore();
    const store = mockStore(getMockStateFilter());

    const filterWidget = (
        <Provider store={store}>
            <MemoryRouter key="test">
                <FilterWidget {...baseProps} />
            </MemoryRouter>
        </Provider>
    );

    it('is shallow rendered without crashing', () => {
        const filterSelectedItems = <FilterWidget {...baseProps} />;

        const filterSelectedItemsComponent = shallow(filterSelectedItems);
        expect(filterSelectedItemsComponent).toMatchSnapshot();
    });

    it('should return truth length of searchTypes', () => {
        const filterSelectedItems = <FilterWidget {...baseProps} />;

        const filterSelectedItemsComponent = shallow(filterSelectedItems);
        expect(filterSelectedItemsComponent.find('.filter-container__sorts').children().length).toEqual(Object.keys(SearchTypes).length);
    });

    it('should handle onSearchStringChange', () => {
        const event = {
            target: {
                value: 'test'
            }
        };

        const filterSelectedItemsComponent = mount(filterWidget);
        filterSelectedItemsComponent.find('.filter-container__field-search').simulate('change', event);
        expect(baseProps.onInputTitleSearch).toBeCalledWith(baseProps.filterId, event.target.value);
    });

    it('should handle onOpenContexts, state isOpenContexts must be true', () => {
        const filterSelectedItems = <FilterWidget {...baseProps} />;

        const filterSelectedItemsComponent = shallow(filterSelectedItems);
        filterSelectedItemsComponent.find('.filter-container__context-drop').simulate('click');
        expect(filterSelectedItemsComponent.state('isOpenContexts')).toEqual(true);
    });

    it('should handle onOpenContexts, state isOpenDemissions must be false', () => {
        const filterSelectedItems = <FilterWidget {...baseProps} />;

        const filterSelectedItemsComponent = shallow(filterSelectedItems);
        filterSelectedItemsComponent.find('.filter-container__context-drop').simulate('click');
        expect(filterSelectedItemsComponent.state('isOpenDemissions')).toEqual(false);
    });

    it('should handle onOpenDemissions , state isOpenContexts must be true', () => {
        const filterSelectedItems = <FilterWidget {...baseProps} />;

        const filterSelectedItemsComponent = shallow(filterSelectedItems);
        filterSelectedItemsComponent.find('.filter-container__demisions-drop').simulate('click');
        expect(filterSelectedItemsComponent.state('isOpenContexts')).toEqual(false);
    });

    it('should handle onOpenDemissions , state isOpenDemissions must be false', () => {
        const filterSelectedItems = <FilterWidget {...baseProps} />;

        const filterSelectedItemsComponent = shallow(filterSelectedItems);
        filterSelectedItemsComponent.find('.filter-container__demisions-drop').simulate('click');
        expect(filterSelectedItemsComponent.state('isOpenDemissions')).toEqual(true);
    });
});
