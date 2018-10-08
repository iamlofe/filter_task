import React from 'react';
import { shallow } from 'enzyme';

import Main from 'main/components/main/main';

describe('main component', () => {
    const baseProps = {
        history: {
            push: jest.fn()
        }
    };

    it('is shallow rendered without crashing', () => {
        const main = <Main {...baseProps} />;

        const maincomponent = shallow(main);
        expect(maincomponent).toMatchSnapshot();
    });
});
