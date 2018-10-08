import React from 'react';
import { shallow, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';

import FilterCheckbox from 'main-page/components/filter-checkbox/filter-checkbox';
import DemmisionsRecord from 'main/records/dimensions-record';
import { getMockStateFilter } from '../../mock-store/mock-filter-reducer';

describe('account component', () => {
    const baseProps = {
        filterId: '',
        filteredItem: new DemmisionsRecord(),
        onChangeState: jest.fn(),
        checked: false
    };
    const mockStore = configureMockStore();
    const store = mockStore(getMockStateFilter());

    const filterChecbox = (
        <Provider store={store}>
            <MemoryRouter key="test">
                <FilterCheckbox {...baseProps} />
            </MemoryRouter>
        </Provider>
    );

    it('should shallow rendered without crashing', () => {
        const filterChecboxShallow = <FilterCheckbox {...baseProps} />;

        const filterChecboxComponent = shallow(filterChecboxShallow);
        expect(filterChecboxComponent).toMatchSnapshot();
    });

    it('should mount rendered without crashing', () => {
        const filterChecboxComponent = mount(filterChecbox);
        expect(filterChecboxComponent.find(FilterCheckbox)).toHaveLength(1);
    });

    it('should handle onChangeState with parametres', () => {
        const event = { target: 'value' };

        const filterChecboxComponent = mount(filterChecbox);
        filterChecboxComponent.find('.filter-container__input-checkbox').simulate('change', event);

        expect(baseProps.onChangeState).toBeCalledWith(
            baseProps.filterId,
            baseProps.filteredItem.get('contextId'),
            baseProps.filteredItem.get('demisionId'),
            baseProps.filteredItem.get('resultId')
        );
    });
});
