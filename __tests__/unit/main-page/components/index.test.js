import React from 'react';
import { shallow } from 'enzyme';

import IndexFilter from 'main/components';

describe('index component', () => {
    it('should shalow component without crashing', () => {
        const indexFilterC = <IndexFilter />;
        const indexFilterComponent = shallow(indexFilterC);
        expect(indexFilterComponent).toMatchSnapshot();
    });
});
