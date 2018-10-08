import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { List } from 'immutable';
import { CurrentContext } from 'main-page/records/filter-record';
import FilterWidget from 'main-page/containers/filter-widget-container';

import {
    changeStateContext,
    changeStateDemission,
    changeStateResult,
    chooseTypeSearch,
    inputTitleSearch
} from 'main-page/actions/filter-actions';
import { getMockStateMainItems } from '../mock-store/mock-filter-reducer';

describe('Investments Tab container', () => {
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
    const props = {
        filterId: 'test'
    };

    const mockStore = configureMockStore();
    let container;

    beforeEach(() => {
        const store = mockStore(getMockStateMainItems('overlap'));

        container = shallow(<FilterWidget store={store} {...props} />);
    });

    it('should render with props from initialState', () => {
        const dispatch = jest.fn();

        const filterId = 'test';
        const contextId = '37';
        const demisionId = '29';
        const resultId = '10';
        const type = 'overlap';
        const titleSearch = 'qwwd';

        expect(container.prop('onChangeStateContext')(filterId, contextId)).toEqual(changeStateContext(filterId, contextId));
        expect(container.prop('onChangeStateDemission')(filterId, contextId, demisionId)).toEqual(changeStateDemission(filterId, contextId, demisionId));
        expect(container.prop('onChangeStateResult')(filterId, contextId, demisionId, resultId)).toEqual(changeStateResult(filterId, contextId, demisionId, resultId));
        expect(container.prop('onChooseTypeSearch')(filterId, type)).toEqual(chooseTypeSearch(filterId, type));
        expect(container.prop('onInputTitleSearch')(filterId, titleSearch)).toEqual(inputTitleSearch(filterId, titleSearch));
    });
});
