import React from 'react';
import { shallow, mount } from 'enzyme';

import ButtonFilter from 'shared/components/button-filter/button-filter';

describe('button-filter component', () => {
    const baseProps = {
        onClick: jest.fn(),
        label: 'test',
        className: 'testClass'
    };

    it('should shalow rendered without crashing', () => {
        const filterButton = <ButtonFilter {...baseProps} />;

        const filterButtonComponent = shallow(filterButton);
        expect(filterButtonComponent).toMatchSnapshot();
    });

    it('should have label', () => {
        const filterButton = <ButtonFilter {...baseProps} />;

        const filterButtonComponent = shallow(filterButton);
        expect(filterButtonComponent.text()).toEqual(baseProps.label);
    });
});
